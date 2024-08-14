const qrs = require("./json/qrs.json");
const mems = require("./json/mem.json");
const fs = require("fs");
const errors = require("./json/error.json");
const corr = require("./json/corrected.json");
const init = async () => {
  let res = [];
  mems.forEach((mem) => {
    const avail = res.findIndex(
      (res) => res.email.toLowerCase() === mem.email.toLowerCase(),
    );
    if (avail !== -1) {
      res[avail].membership.push(mem.memtype);
    } else {
      res.push({
        email: mem.email,
        membership: [mem.memtype],
      });
    }
  });

  qrs.forEach((qr) => {
    const avail = res.findIndex(
      (mem) => mem.email.toLowerCase() === qr.email.toLowerCase(),
    );
    typeOfQR =
      qr.used && qr.verified
        ? "used"
        : qr.used && !qr.verified
          ? "wasted"
          : !qr.used && !qr.verified
            ? "unused"
            : "invalid";
    if (avail !== -1) {
      if (!res[avail].qr) res[avail].qr = {};
      res[avail].qr[typeOfQR] = (res[avail].qr[typeOfQR] || 0) + 1;
    } else {
      res.push({
        email: qr.email,
        validity: mem.validity,
      });
    }
  });
  fs.writeFileSync("./json/report.json", JSON.stringify(res));
};
const detailed = async () => {
  let res = [];
  mems.forEach((mem) => {
    const avail = res.findIndex(
      (res) => res.email.toLowerCase() === mem.email.toLowerCase(),
    );
    if (avail !== -1) {
      res[avail].membership.push(mem);
    } else {
      res.push({
        email: mem.email,
        membership: [mem],
        qr: {
          used: [],
          wasted: [],
          unused: [],
          invalid: [],
        },
      });
    }
  });

  qrs.forEach((qr) => {
    const avail = res.findIndex(
      (mem) => mem.email.toLowerCase() === qr.email.toLowerCase(),
    );
    typeOfQR =
      qr.used && qr.verified
        ? "used"
        : qr.used && !qr.verified
          ? "wasted"
          : !qr.used && !qr.verified
            ? "unused"
            : "invalid";
    if (avail !== -1) {
      if (!res[avail].qr) res[avail].qr = {};
      res[avail].qr[typeOfQR] = [...res[avail].qr[typeOfQR], qr];
    } else {
      console.log("not found", qr.email);
    }
  });
  const final = res.filter((r) => {
    const err = errors.find((e) => e.data.email === r.email);
    if (err) return false;
    return true;
  });
  console.log(final.length);
  console.log(res.length);
  fs.writeFileSync("./json/reportDetailed.json", JSON.stringify(final));
};
const valuesOfMem = {
  base: 1,
  silver: 2,
  gold: 3,
  diamond: 4,
};

const correct = async () => {
  let res = [];

  corr.forEach((corr) => {
    const { data } = corr;
    const membershipOfUser = mems.find(
      (m) => m.email.toLowerCase() === data.email.toLowerCase(),
    );
    const sum = (data.qr.unused || 0) + (data.qr.wasted || 0);
    // const QRsOfUser = qrs.filter(
    // 	(q) => q.email.toLowerCase() === data.email.toLowerCase() && !q.verified
    // )
    res.push({
      email: data.email,
      membership: [membershipOfUser],
      count: sum,
      // qr: {
      // 	used: QRsOfUser.filter((q) => q.used && q.verified),
      // 	wasted: QRsOfUser.filter((q) => q.used && !q.verified),
      // 	unused: QRsOfUser.filter((q) => !q.used && !q.verified),
      // 	invalid: QRsOfUser.filter((q) => !q.used && q.verified),
      // },
    });
  });
  res.forEach((r) => {
    if (valuesOfMem[r.membership[0].memtype] < r.count) {
      console.log(r.email);
    }
  });
  fs.writeFileSync("./json/reportCorrected.json", JSON.stringify(res));
};
detailed();
init();
correct();
