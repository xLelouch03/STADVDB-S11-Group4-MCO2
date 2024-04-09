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
    hospitalname: null,
    IsHospital: "'Bawa Hospital'",
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
    await conn.query(`INSERT INTO appointments (id, apptid, hospitalname) VALUES (999999999, "test", "Bawa Hospital");`);
    await db.insert_query(data);
    const query = "SELECT id FROM appointments where id = 999999999 AND hospitalname LIKE 'Bawa Hospital'";
    const value_to_check = await conn.query(query);
    await conn.query(`DELETE FROM appointments WHERE id = 999999999;`);
    expect(value_to_check[0][0].id).toBe(999999999);
});

test.concurrent('addition of 2 numbers', async () => {
    conn = await connectServer();
  });
  
test.concurrent('subtraction 2 numbers', async () => {
    conn = await connectServer();

});


