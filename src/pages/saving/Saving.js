import React, { useState, useSyncExternalStore } from "react";
import Popup from "../../Components/Popup";
import "./Saving.css";
import submit from "../../images/submit.png";
import draft from "../../images/draft.png";
import Navbar from "../../Components/Navbar/Navbar";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { useNavigate,useLocation  } from "react-router-dom";

export default function Saving() {
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showDraftModal, setShowDraftModal] = useState(false);
  const [selectedCheckbox, setSelectedCheckbox] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const locationObj = useLocation();
  const searchParams = new URLSearchParams(locationObj.search);
  const department = searchParams.get('department');
  const location = searchParams.get('location');

  
  const handleCloseSubmitModal = () => {
    setShowSubmitModal(false);
  };

  const handleCloseDraftModal = () => {
    setShowDraftModal(false);
  };

  const handleShowDraftModal = () => {
    setShowDraftModal(true);
  };

  const handleCheckboxChange = (event) => {
    const { id } = event.target;
    setSelectedCheckbox(id);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // handling form submit
  const [idea, setIdea] = useState();
  const [plan, setPlan] = useState();
  const [resources, setResources] = useState();
  const [savings, setSavings] = useState();
  const [auth,setAuth]=useAuth();
  const navigate= useNavigate();

  const handleDraft= async(e)=>{
    e.preventDefault();


    try {
      
      const ideaData= new FormData()

    ideaData.append("idea",idea)
    ideaData.append("implementation",plan)
    ideaData.append("resources",resources)
    ideaData.append("user",auth.user._id)
    ideaData.append("cost",savings)
    ideaData.append("ideaStatus","Draft")
    ideaData.append("planTime",selectedCheckbox)
    ideaData.append("department",department)
    ideaData.append("location",location)
    ideaData.append("file",selectedFile)
    const {data}=axios.post ('/api/ideas/create-idea',ideaData)

    if(data?.success){
      console.log(data?.message)
    }else{
      console.log("Idea saved in draft Successfully")
    }
    setShowDraftModal(true);
      
    } catch (error) {
      console.log("Something is wrong in saving Idea draft")
    }

  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    
  try {
    const ideaData= new FormData()

    ideaData.append("idea",idea)
    ideaData.append("implementation",plan)
    ideaData.append("resources",resources)
    ideaData.append("user",auth.user._id)
    ideaData.append("cost",savings)
    ideaData.append("planTime",selectedCheckbox)
    ideaData.append("department",department)
    ideaData.append("location",location)
    ideaData.append("file",selectedFile)
    const {data}=axios.post ('/api/ideas/create-idea',ideaData)

    if(data?.success){
      console.log(data?.message)
    }else{
      console.log("Idea Posted Successfully")
      navigate('/idealstatus')
    }
    
  } catch (error) {
    console.log("Something is wrong in creating Ideas")
  }
    console.log(idea);
    console.log(selectedCheckbox)
    console.log(selectedFile)
  };

  return (
    <div className="container">
      <Navbar />
      <div className="upperSection">
        <h1>
          Portal For
          <br /> <span>Cost Savings Plan</span>
        </h1>
      </div>
      <div className="main">
        <h1>Idea</h1>
        <textarea
          onChange={(e) => setIdea(e.target.value)}
          value={idea}
          placeholder="For Instance: To try to create a paperless environment in my Dept."
        />

        <h1>Implementation Plan</h1>
        <textarea 
        onChange={(e) => setPlan(e.target.value)}
        value={plan}
        placeholder="For Instance: To maintain softcopy of every document including booklets" />

        <h1>Resources Required</h1>
        <textarea 
        onChange={(e) => setResources(e.target.value)}
        value={resources}
        placeholder="Need support of team members and brief session with the team to highlight the importance" />

        <textarea onChange={(e) => setSavings(e.target.value)}
          value={savings}
        placeholder="Estimated Savings in PKR" className="estimate" />

        <div className="checkbox">
          <div className="checkboxInner">
            <label htmlFor="One Time">One Time</label>
            <input
              type="checkbox"
              id="One Time"
              name="myCheckbox"
              checked={selectedCheckbox === "One Time"}
              onChange={handleCheckboxChange}
            />
          </div>
          <div className="checkboxInner">
            <label htmlFor="Recurring">Recurring</label>
            <input
              type="checkbox"
              id="Recurring"
              name="myCheckbox"
              checked={selectedCheckbox === "Recurring"}
              onChange={handleCheckboxChange}
            />
          </div>
        </div>

        <div className="attachment">
          <label htmlFor="attachmentInput">
            Add an attachment{" "}
            <i className="fa fa-paperclip" aria-hidden="true"></i>
          </label>
          <input
            id="attachmentInput"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>

        <div className="btn_action">
          <button onClick={handleSubmit} className="submit">
            Submit
          </button>

          <div>
            <Popup
              show={showSubmitModal}
              handleClose={handleCloseSubmitModal}
              title="Successfully Submit"
              children="Thank You for using Dalda portal for cost-saving. Your application is in process and you will receive updates about your request on your registered email."
              closeButtonLabel="Cancel"
              primaryButtonLabel="Done"
              image={submit}
            />
          </div>

          <button onClick={handleDraft} className="draft">
            Draft
          </button>
          <div>
            <Popup
              show={showDraftModal}
              handleClose={handleCloseDraftModal}
              title="Your Idea has been saved as a draft"
              children="Your Idea has been saved as a draft"
              closeButtonLabel="Cancel"
              primaryButtonLabel="Done"
              image={draft}
            />
          </div>

          <button className="cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
}
