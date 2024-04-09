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
    await conn.query(`INSERT INTO appointments (apptid, hospitalname) VALUES ("test", "Bawa Hospital");`);
    await db.insert_query(data);
    const query = "SELECT apptid FROM appointments where apptid LIKE 'test' AND hospitalname LIKE 'Bawa Hospital';";
    const value_to_check = await conn.query(query);
    await conn.query(`DELETE FROM appointments WHERE apptid LIKE 'test'`);
    expect(value_to_check[0][0].apptid).toBe('test');
});

describe('my beverage', () => {
        // Define the concurrent transactions to be tested
        const transaction1 = async () => {
            // Execute the first transaction
            // For example, perform an insert operation
          };
      
          const transaction2 = async () => {
            // Execute the second transaction
            // For example, perform an update operation
          };
      
          // Execute both transactions concurrently
          await Promise.all([transaction1(), transaction2()]);
}

