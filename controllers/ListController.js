const List = require('../models/List');
const User = require('../models/User');
const csvParser = require('../utils/csvParser');
const fs = require('fs');

const createList = async (req, res) => {
    try {
        const { title, customProperties } = req.body;
        const list = new List({ title, customProperties });
        await list.save();
        res.status(201).send(list);
    } catch (error) {
        res.status(400).send(error);
    }
};

const uploadUsers = async (req, res) => {
    const listId = req.params.listId;
    const file = req.file.path;
    try {
        const list = await List.findById(listId);
        if (!list) {
            return res.status(404).send({ error: 'List not found' });
        }

        const { users, errors } = await csvParser(file, list);

        const result = await User.insertMany(users, { ordered: false }).catch((error) => {
            // console.log(error.writeErrors[0].err.op)
            // for(let i )
                let tempError = []
                for(let i=0;i<error.writeErrors.length;i++){
                    console.log(error.writeErrors[i].err.op.email)
                    tempError.push({email : error.writeErrors[i].err.op.email,errmsg : error.writeErrors[i].err.errmsg })
                }
            const inserted = error.result.result.nInserted;
            // error.writeErrors.map((err)=>console.log(err.err.op.email));
            // error.writeErrors.map((err)=>{
                // console.log(err.err.op.email);
                // tempError.push({email: err.err.op.email})});
            // errors.push(...error.writeErrors.map((err) => console.log(err)));
            console.log(tempError)
            errors.push(tempError)
            console.log(errors)
            return { nInserted: inserted };
        });

        fs.unlinkSync(file);

        res.status(200).send({
            successCount: result.nInserted,
            errorCount: errors.length,
            errors,
            totalUsers: await User.countDocuments({ listId })
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

const getUser  = async (req, res) => {
    const listId = req.params.listId;
    try {
        const users = await User.find({ listId });
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {createList , uploadUsers , getUser}