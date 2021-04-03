const { Nea } = require('./model.js');
const csvFilePath = process.env.DATA_PATH;
const csv = require('csvtojson')


exports.loadData = async (req, res) =>{
    let msg = "Nea added.";
	console.log("loadData");
	csv()
		.fromFile(csvFilePath)
		.then((neas)=>{
			neas.forEach (nea => {
				let nea2 = new Nea(nea);
				nea2.save();
			})
		})
		
    res.json({ msg }); 
    return true;
}


exports.findAll = async (req, res) =>{
    let neas = null;
	try{
		neas = await Nea.find({})
		res.json({ neas }); 
	} catch(e){
		console.log("Error: ", e);
	}
    return neas;
};

