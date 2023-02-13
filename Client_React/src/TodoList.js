    
import React, { useState,useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';

const nodeURL='http://localhost:9000';
     function ToDoList(){
      const [data, setData] =useState('');
      const [listData, setlistData] = useState([]);
      const [isrefresh, setRefresh]=useState('');
      const [flag, setflag] = useState("allItems");
      const [spinnerflag, setSpinnerflag] = useState(false);
      // const [activebtn, setActive]=useState('');
 
      //This function (addItems) is performed on clicking the add button . And adds a new item to the todo list ---------------------------- //
      const  addItems = (e)=>{
        e.preventDefault();
        setSpinnerflag(true);
        if(listData.filter(val=> val.Itemname===data).length === 0 || listData.length === 0){
        if(data){
            //setlistData(updatedataFinal);
            // setRefresh(updatedataFinal);
            /**************************** */
            console.log(data+"============"+nodeURL);
            axios.post(`${nodeURL}/addTask`, {
              Itemname: data,
              completed: false,
              activeStatus : false
            })
            .then(function (response) {
              console.log("Task Added Successfully");
              console.log(response);
              setSpinnerflag(false);
              setRefresh(response);

            })
            .catch(function (error) {
              console.log(error);
              errorPopulateMsg(error);
            });
            //********************************* *//
          }
        }else{
          errorPopulateMsg("Duplicate Items not allow ");
          setSpinnerflag(false);
        }
        setData('');
    }

      //****This function updates the active state of the todo list. ****//
      const activeTodo = (item, index, ActiveStatusflag) => {
        setSpinnerflag(true);
         axios.put(`${nodeURL}/update/${index}`, {
          Itemname: item,
         completed: false,
         activeStatus: true
       })
         .then(function (response) {
          console.log("=============="+response.data.data);
          setlistData(response.data.data);
          setSpinnerflag(false);
          setRefresh(response.data.data);
         })
         .catch(function (error) {
          console.log(error);
          errorPopulateMsg(error);
         });
      };
   
//****This function publish  of the todo list. ****//
 const ActionTodo = (ActionFlag) => {
  setSpinnerflag(true);
  setflag(ActionFlag);
  axios.get(`${nodeURL}/getTaskList/${ActionFlag}`, {
   })
  .then(function (response) {
          setlistData(response.data.data);
          setSpinnerflag(false);
       //   setRefresh(response.data.data);
   
  })
  .catch(function (error) {
   console.log(error);
   errorPopulateMsg(error);
  });
   };


     //****This function updates the completed state of the todo list. ****//
  const markTodo = (item, index, checkedValue, ActiveStatusflag) => {
    // setActive();
    setSpinnerflag(true);
    axios.put(`${nodeURL}/update/${index}`, {
      Itemname: item,
      completed: checkedValue,
      activeStatus: ActiveStatusflag
    })
      .then(function (response) {
        setlistData(response.data.data);
        setSpinnerflag(false);
        setRefresh(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
        errorPopulateMsg(error);
      });
  };

  //****This function removes item from todo list. ****//
     const removeTodo = (index) => {
      setSpinnerflag(true);
     console.log(index+"====remove item====")
      axios.delete(`${nodeURL}/delete/${index}`)
        .then(function (response) {
          setlistData(response.data.data);
          setSpinnerflag(false);
          setRefresh(index);
        })
        .catch(function (error) {
          console.log(error);
          errorPopulateMsg(error);
        });
    };
  
    
     //****This function removes item from todo list. ****//
     const removeAllCheckedTodo = () => {
      setSpinnerflag(true);
         axios.delete(`${nodeURL}/removeAllCheckedTodo/`)
         .then(function (response) {
           setlistData(response.data.data);
           setSpinnerflag(false);
           setRefresh(response.data.data);
         })
         .catch(function (error) {
           console.log(error);
           errorPopulateMsg(error);
         });
     };

      
      //***************Refresh grid view **********axios****** *//
      
      useEffect(()=>{
        setSpinnerflag(true);
        axios.get(`${nodeURL}/getTaskList`)
        .then(function (response) {
          console.log("===="+response.data.data);
          setlistData(response.data.data);
          setSpinnerflag(false);
          // Todo(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
          errorPopulateMsg(error);
        });
    }, [isrefresh])
    

    //*********************Error populated msg********* */
    const errorPopulateMsg = (errormsg) => {
      toast.error("Something went wrong with 'Service'...!!! Please try again "+errormsg, {
        onClose: () => {
          setSpinnerflag(false)
        },
        autoClose: 5000
      })
    }
      
      //******************************//
       return (
        <>
                <div>
                <ToastContainer />
                </div>
                {spinnerflag && <div className="spinner">
                <CircularProgress color="secondary" />
                </div>}
        <div className='container'>
          <div className='header'> ToDo List </div>
          <form  onSubmit={addItems}>
          <input type='text' placeholder="Add Items"   value= {data} onChange={(e)=>setData(e.target.value)} />
          <button onClick={(e)=>addItems(e)}>Add Items</button>
          </form>
          <button className={` ${flag === 'activeStatus' ? "colorChange" : ""}`} onClick={() => { ActionTodo("activeStatus") }}>Active</button>
          <button className={`${flag === 'completed' ? "colorChange" : ""}`} onClick={() => { ActionTodo("completed") }}>Completed</button>
          <button className={`${flag === 'allitems' ? "colorChange" : ""}`} onClick={() => { ActionTodo("allitems") }}>All Items</button>
          <button   className="checkedRemove"  onClick={()=>removeAllCheckedTodo()}>Remove Checked Items</button>
          <p className="List-heading"> List Grid Table </p>



          {listData && listData.map((data , i )=>{
               console.log(JSON.stringify(data)+"=====listdatavalue="+data.activeStatus+"=="+data.completed+"====="+data.id)
            return (
              <>
              <p>
                <div className="listData" >
                <button     onClick={()=>removeTodo(data.id)}>Remove</button> 
                <button className={`${(data.activeStatus) ? "colorChange" : (data.completed)?"":"colorChangebtn"}`}    disabled ={(data.completed)?false:true}  onClick={()=>{activeTodo(data.Itemname,data.id,data.activeStatus)}}>Active</button>
                <input type='checkbox'  checked={data.completed} onChange={(e)=>markTodo(data.Itemname,data.id, e.target.checked,data.activeStatus)}/>
                <span className={`${(data.completed) ? "colorChangeCompleted" :""}`}>{data.Itemname}</span>
              </div>
              </p>
              </>
            )
          }
          )}
        </div>
        </>
       )
     }

     export default ToDoList;