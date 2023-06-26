const cds = require("@sap/cds");
const {SalesOrder} = cds.entities("com.logali");

module.exports = (srv) => {
 //READ//
 srv.on("READ", "GetSalesOrder", async (req) => {

    if (req.data.email != undefined) {
        return await SELECT.from `com.logali.SalesOrder`
        .where`email = ${req.data.email}`;
    }

    return await SELECT.from(SalesOrder);
});

//AFTER
srv.after("READ", "SalesOrder", (data) => {
    return data.map((SalesOrder) => (SalesOrder.Reviewed = true));
  });

  //************CREATE******/
  srv.on("CREATE", "SalesOrder", async (req) => {
    let returnData = await cds
      .transaction(req)
      .run(
        INSERT.into(SalesOrder).entries({
          email: req.data.email,
          firtsname: req.data.firtsname,
          lastName: req.data.lastName,
          country: req.data.country,
          createon: req.data.createon,
          deliverydate: req.data.deliverydate,
          orderstatus: req.data.orderstatus,
          imagenurl: req.data.imagenurl,
          item: req.data.item, 
        })
      )
      .then((resolve, reject) => {
        console.log("Resolve", resolve);
        console.log("Reject", reject);

        if (typeof resolve !== "undefined") {
          return req.data;
        } else {
          req.error(409, "Record Not Inserted");
        }
      })
      .catch((err) => {
        console.log(err);
        req.error(err.code, err.message);
      });
    console.log("Before End", returnData);
    return returnData;
  });

  srv.before("CREATE", "SalesOrder", (req) => {
    req.data.createon = new Date().toISOString().slice(0, 10);
    return req;
  });

//************UPDATE******/
srv.on("UPDATE", "SalesOrder", async (req) => {
let returnData = await cds
  .transaction(req)
  .run([
    UPDATE(SalesOrder, req.data.email).set({
      firstname: req.data.firstname,
      lastname: req.data.lastname,
    }),
  ])
  .then((resolve, reject) => {
    console.log("Resolve: ", resolve);
    console.log("Reject: ", reject);

    if (resolve[0] == 0) {
      req.error(409, "Record Not Found");
    }
  })
  .catch((err) => {
    console.log(err);
    req.error(err.code, err.message);
  });
console.log("Before End", returnData);
return returnData;
});

//************DELETE******/
srv.on("DELETE", "SalesOrder", async (req) => {
let returnData = await cds
  .transaction(req)
  .run(
    DELETE.from(SalesOrder).where({
      email: req.data.email,
    })
  )
  .then((resolve, reject) => {
    console.log("Resolve", resolve);
    console.log("Reject", reject);

    if (resolve !== 1) {
      req.error(409, "Record Not Found");
    }
  })
  .catch((err) => {
    console.log(err);
    req.error(err.code, err.message);
  });
console.log("Before End", returnData);
return await returnData;
});


//************ACTION******/
srv.on("cancelOrder", async (req) => {
const { email } = req.data;
const db = srv.transaction(req);

const resultsRead = await db
  .read(SalesOrder, ["firstname", "lastname", "Approved"])
  .where({ email: email });

let returnOrder = {
  status: "",
  message: "",
};

console.log(email);
console.log(resultsRead);

if (resultsRead[0].Approved == false) {
  const resultsUpdate = await db
    .update(SalesOrder)
    .set({ orderstatus: "1" })
    .where({ email: email });
  returnOrder.orderstatus = "Succeeded";
  returnOrder.message = `The Order placed by ${resultsRead[0].firstname} ${resultsRead[0].lastname} was canceled`;
} else {
  returnOrder.status = "Failed";
  returnOrder.message = `The Order placed by ${resultsRead[0].firstname} ${resultsRead[0].lastname} was NOT canceled becouse was already approved`;
}
console.log("Action cencelOrder executed");
return returnOrder;
});
};
