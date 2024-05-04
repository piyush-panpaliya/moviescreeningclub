const Memdata = require ('../models/memdataModel.js');
const moment = require('moment');

exports.fetchMembershipsByEmail = async (req, res) => {
    const { email } = req.params;
    try {
      const memberships = await Memdata.find({ email });
      res.status(200).json({ memberships });
    } catch (error) {
      console.error('Error fetching memberships:', error);
      res.status(500).json({ error: 'Error fetching memberships' });
    }
  };

exports.saveusermem =async (req, res) => {
    const{email,memtype,validity} = req.body;
    const newusermem = new Memdata({ email, memtype, validity });
    newusermem.save()
      .then((savedusermem) => {
        console.log("Usermem details saved:", savedusermem);
        res.status(200).json(savedusermem);
      })
      .catch((error) => {
        console.error("Error saving Usermem:", error);
        res.status(500).json({ error: "Error saving Usermem" });
      });
  };

  exports.checkMembership = async (req, res) => {
    
    try {
        const { email } = req.params;
        const allMemberships = await Memdata.find({ email });
        
        if (allMemberships.length > 0) {
            const currentDate = moment();
            let hasMembership = false;
            for (const membership of allMemberships) {
                const validityDate = moment(membership.validitydate, 'DD-MM-YYYY');
                if (validityDate.isAfter(currentDate, 'day')) {
                    hasMembership = true;
                    break; // Exit the loop if any membership is valid
                }
            }
            
            return res.json({ hasMembership });
        } else {
            return res.json({ hasMembership: false });
        }
    } catch (error) {
        console.error("Error checking membership:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


exports.suspendMembership = async (req, res) => {
  console.log("reached");
  const { email } = req.body;
  try {
    const currentDate = moment().format("DD-MM-YYYY"); // Get the current date in "dd-mm-yyyy" format
    const formattedCurrentDate = moment(currentDate, "DD-MM-YYYY").toDate(); // Convert current date to JavaScript Date object
    const userMemberships = await Memdata.find({ email }); // Get all memberships associated with the user's email
    let membershipSuspended = false;

    // Iterate through each membership
    for (const membership of userMemberships) {
      // Format the validity date of the membership to match the format of the current date
      const formattedValidityDate = moment(membership.validitydate, "DD-MM-YYYY").toDate();

      // Compare the formatted validity date with the formatted current date
      if (formattedValidityDate >= formattedCurrentDate) {
        const newValidityDate = moment(formattedCurrentDate).subtract(1, 'days').format("DD-MM-YYYY");

        // Update the membership's validity date to the new validity date
        membership.validitydate = newValidityDate;
        await membership.save();
        membershipSuspended = true;
      }
    }

    if (membershipSuspended) {
      res.status(200).send("Memberships suspended successfully");
    } else {
      res.status(404).send("No current memberships found for the user");
    }
  } catch (error) {
    console.error("Error suspending memberships:", error);
    res.status(500).send("Internal server error");
  }
};