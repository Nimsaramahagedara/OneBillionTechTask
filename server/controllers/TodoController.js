import TodoModel from "../models/ToDoItem.js"


//GETALL ITEM
export const getAllItem = async (req, res) => {
    const {createdBy} = req.body;
    try {
        const result = await TodoModel.find({createdBy});
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//GET ITEM
export const getItem = async (req, res) => {
    const { _id } = req.params;
    try {
        const result = await TodoModel.findById(_id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


//CREATE ITEM
export const createItem = async (req, res) => {
    const { title, createdBy } = req.body;
    const status = false;
    try {
        if (!title) {
            throw Error('Title Cannot be null');
        }
        const result = await TodoModel.create({ title, status, createdBy })
        res.status(200).json({ message: 'Item added successfully!', result })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//DELETE ITEM
export const deleteItem = async (req, res) => {
    const { _id } = req.params;
    try {
        const result = await TodoModel.findByIdAndDelete(_id);
        res.status(200).json({ message: 'Item Deleted successfully!', result })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//UPDATE ITEM
export const updateItem = async (req, res) => {
    const { _id } = req.params;
    const { title, status } = req.body;
    try {
        const isExist = await TodoModel.findById(_id);
        if (!isExist) {
            throw Error('Item Not Found');
        }
        const result = await TodoModel.findByIdAndUpdate(_id, {
            title,
            status
        },{new:true})
        if(result){
            res.status(200).json({ message: 'Updated Successfully', result });
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


//UPDATE ITEM
export const changeStatus = async (req, res) => {
    const { _id } = req.params;
    const { status } = req.body;
    try {
        const isExist = await TodoModel.findById(_id);
        if (!isExist) {
            throw Error('Item Not Found');
        }
        const result = await TodoModel.findByIdAndUpdate(_id, {
            status
        },{new:true})
        if(result){
            res.status(200).json({ message: 'Updated Successfully', result });
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}