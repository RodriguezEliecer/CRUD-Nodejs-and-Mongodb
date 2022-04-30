import { json } from "express";
import Task from "../models/Task"

export const renderTasks = async(req,res)=>{
    const tasks = await Task.find().lean();
    res.render("index", {tasks:tasks});
};

export const createTasks = async(req,res)=>{

    try {
        const task = Task(req.body);
        await task.save();
        res.redirect("/");
    } catch (error) {
        console.error(error);
    }
};

export const renderTaskEdit =  async(req, res) => {
    try {
        const task = await Task.findById(req.params.id).lean();
        res.render("edit", { task } );
    }
    catch (error) {
        console.log(error.message);
    }
}

export const editTask = async(req, res) => {

    try {
        const {id} = req.params;
        await Task.findByIdAndUpdate(id, req.body)
    } catch (error) {
        console.log(error.message)
    }
    res.redirect('/')
}

export const deleteTask = async(req,res)=>{
    try {
        const {id} = req.params;
        await Task.findByIdAndDelete(id)
    }
    catch (error) {
        console.log(error.message)
    }
    res.redirect('/')
}

export const taskToggleDone = async(req,res)=>{

    try {
        const {id} = req.params;
        const task = await Task.findById(id);
        task.done = !task.done;
        await task.save();
    }
    catch (error) {
        console.log(error.message)
    }
    res.redirect('/');
}