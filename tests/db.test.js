const db = require('../models/db');
const nodes = require('../models/nodes.js');

const data = {
  id: 999999999,
  pxid: null,
  clinicid: null,
  doctorid: null,
  apptid: "'test'",
  status: null,
  TimeQueued: null,
  QueueDate: null,
  StartTime: null,
  EndTime: null,
  type: null,
  IsVirtual: null,
  mainspecialty: null,
  hospitalname: "'Bawa Hospital'",
  IsHospital: null,
  City: null,
  Province: null,
  RegionName: null,
  patient_age: null,
  patient_gender: null,
  Location: null
}


async function connectServer() {
  const master = await nodes.getPrimaryHost();
  console.log("Connecting to node " + master);
  const conn = await nodes.get_single_connection(master);
  console.log("Connected");
  return conn;
}

test('Inserts value into database', async () => {
  conn = await connectServer();
  // await conn.query(`INSERT INTO appointments (apptid, hospitalname) VALUES ("test", "Bawa Hospital");`);
  await db.insert_query(data);
  const query = "SELECT apptid FROM appointments where apptid LIKE 'test' AND hospitalname LIKE 'Bawa Hospital';";
  const value_to_check = await conn.query(query);
  console.log(value_to_check)
  await conn.query(`DELETE FROM appointments WHERE apptid LIKE 'test'`);
  expect(value_to_check[0][0].apptid).toBe('test');
});

test('Concurrent transactions in two or more nodes are reading the same data item', async () => {
  // Define the concurrent transactions to be tested
  conn_for_deleting = await connectServer();
  await conn_for_deleting.query(`DELETE FROM appointments WHERE apptid LIKE 'test'`);
  await db.insert_query(data);
  const transaction1 = async () => {
    
    conn = await nodes.get_single_connection('10.2.0.144');
    await conn.beginTransaction();
    await conn.query(`SET @@session.time_zone = "+08:00";`);
    result = await conn.query(`SELECT apptid FROM appointments WHERE hospitalname LIKE "Bawa Hospital";`);
    await conn.query(`DO SLEEP(3);`);
    await conn.commit();
    await conn.release();
    expect(result[0][0].apptid).toBe('test');
  };

  const transaction2 = async () => {
    conn = await nodes.get_single_connection('10.2.0.145');
    await conn.beginTransaction();
    await conn.query(`SET @@session.time_zone = "+08:00";`);
    result = await conn.query(`SELECT apptid FROM appointments WHERE hospitalname LIKE "Bawa Hospital";`);
    await conn.commit();
    await conn.release();
    expect(result[0][0].apptid).toBe('test');
  };

  // Execute both transactions concurrently
  await Promise.all([transaction1(), transaction2()]);
  await conn_for_deleting.query(`DELETE FROM appointments WHERE apptid LIKE 'test'`);
}, 100000);

test('At least one transaction in the three nodes is writing (update / delete) and the other concurrent transactions are reading the same data item.', async () => {
  // Define the concurrent transactions to be tested
  const data_updated = {
    id: 999999999,
    pxid: null,
    clinicid: null,
    doctorid: null,
    apptid: "'test'",
    status: null,
    TimeQueued: null,
    QueueDate: null,
    StartTime: null,
    EndTime: null,
    type: null,
    IsVirtual: null,
    mainspecialty: null,
    hospitalname: "'Rejano Hospital'",
    IsHospital: null,
    City: null,
    Province: null,
    RegionName: null,
    patient_age: null,
    patient_gender: null,
    Location: null
  }
  conn_for_deleting = await connectServer();
  await conn_for_deleting.query(`DELETE FROM appointments WHERE apptid LIKE 'test'`);
  conn = await connectServer();
  await db.insert_query(data);

  let result2 = await conn.query("SELECT id from appointments where apptid LIKE 'test'");

  const transaction1 = async () => {
    await conn.query('SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;');
    await conn.beginTransaction();
    console.log("TRANSACTION 1 HAS STARTED");
    result3 = await conn.query(`SELECT hospitalname FROM appointments WHERE id = ${result2[0][0].id}`);
    console.log('result 3: ', result3);
    await conn.query("DO SLEEP(3)");
    console.log("SLEEP STARTED");
    result = await conn.query(`SELECT hospitalname FROM appointments WHERE id = ${result2[0][0].id}`);
    console.log('result: ', result);
    await conn.commit();
    await conn.release();
    console.log("TRANSACTION 1 HAS ENDED");
    expect(result3[0][0].hospitalname).toBe('Bawa Hospital');
    expect(result[0][0].hospitalname).toBe('Bawa Hospital');
  };

  const transaction2 = async () => {
    
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log("TRANSACTION 2 HAS STARTED");
    db.update_query(data_updated, result2[0][0].id);
    console.log("TRANSACTION 2 HAS ENDED");
  };

  // Execute both transactions concurrently
  await Promise.all([transaction1(), transaction2()]);
  await conn_for_deleting.query(`DELETE FROM appointments WHERE apptid LIKE 'test'`);
}, 100000);

