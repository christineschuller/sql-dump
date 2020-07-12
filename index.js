const oracledb = require("oracledb");
const fs = require("fs");

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const USER = "";
const PASSWORD = "";

const CONNECTION_STRING = "";
const SQL = "";

const close = async (connection) => {
  if (!connection) return;

  try {
    await connection.close();
  } catch (error) {
    console.error(`Unable to close connection.`, error);
  }
};

const run = async () => {
  let connection;

  try {
    connection = await oracledb.getConnection({
      user: USER,
      password: PASSWORD,
      connectString: CONNECTION_STRING,
    });

    const result = await connection.execute(SQL);
    const json = JSON.stringify(result.rows, null, 2);

    const outExists = fs.existsSync("./out/");
    if (!outExists) {
      fs.mkdirSync("./out/");
    }

    fs.writeFileSync(`./out/data-${Date.now()}.json`, json);
  } catch (error) {
    console.error(`An error occurred.`, error);
  } finally {
    close(connection);
  }
};

run();
