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
        const existingMembership = await Memdata.findOne({ email });
        
        if (existingMembership) {
            const validityDate = moment(existingMembership.validitydate, 'DD-MM-YYYY');
            const currentDate = moment();
            
            if (validityDate.isAfter(currentDate, 'day')) {
                return res.json({ hasMembership: true });
            }
        }
        
        return res.json({ hasMembership: false });
    } catch (error) {
        console.error("Error checking membership:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};