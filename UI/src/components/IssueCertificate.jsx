// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserProvider, Contract } from 'ethers';
import { abi } from '../scdata/Cert.json';
import { CertModuleCert } from '../scdata/deployed_addresses.json';
const IssueCertificate = () => {
  const provider = new BrowserProvider(window.ethereum);


  const [course, setCourse] = useState('');
  const [cert_id, setCert_id] = useState('');
  const [username, setUsername] = useState('');
  const [grade, setGrade] = useState('');
  const [issuedate, setIssuedate] = useState('');
// eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  async function connectTometaMask() {
    const signer = await provider.getSigner();
    console.log('address',signer.address)
  }
const handleSubmit= async(e)=>{
  e.preventDefault();
  console.log(course)
  console.log(grade)

  const signer = await provider.getSigner();

  const instance = new Contract(CertModuleCert, abi, signer);
  const tnxl = await instance.issue(cert_id, username, course, grade, issuedate);
   // console.log(course, cert_id, username, grade, issuedate);
  console.log('transaction:', tnxl);
  if (tnxl) {
    const response = await fetch(`/api/submit-form`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({course,cert_id,username,grade,issuedate}),
    }
    );    
    const data = await response.json();

console.log(data) 
if (data) {
 navigate('/');
} else {
 alert(data.message);
}
  }

}
  return (
<>
<div>
    <h1 className=" text-2xl font-bold">Certificate Dapp</h1>

    <br />
        <div >

      <h3 className="text-center text-3xl font-bold mb-4">Issue New Certificate</h3>
          <div className="flex flex-col justify-center items-center ">
            <button className="border-2 bg-orange-700 hover:bg-orange-400 mt-6 ml-10" onClick={connectTometaMask}>
          connect to metamask
        </button>
            <form onSubmit={handleSubmit}>

        <div className="border-2 rounded px-20" >
          <div className="p-2">
          <label className="block " htmlFor="course">Select Course *</label>
          <select className="border-2 border-black" name="course" id="course" onChange={(e) => setCourse(e.target.value)}>
            <option>Certified Blockchain Associate</option>
            <option>Certified Ethereum Developer</option>
            <option>Blockchain Foundation</option>
            <option>Ethereum Fundamentals</option>
          </select>
        </div>

        <div className="p-2">
          <label className="block" htmlFor="cert_id">Certificate ID *</label>
          <input type="text" className="border-2 border-black" name="cert_id" id="cert_id" placeholder="Certificate ID" onChange={(e) => setCert_id(e.target.value)} required/>
        </div>
        <div className="p-2">
          <label className="block" htmlFor="username">Candidate name *</label>
          <input type="text" className="border-2 border-black" name="username" id="username" placeholder="Name" onChange={(e) => setUsername(e.target.value)} required/>
        </div>
        <div className=" p-2">
          <label className="block" htmlFor="grade">Select Grade *</label>
          <select className="border-2 border-black" id="grade" name="grade"onChange={(e) => setGrade(e.target.value)} >
            <option>S</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </select>
        </div>
        <div className="p-2">
          <label className="block" htmlFor="issuedate">Issue Date *</label>
          <input  className="border-2 border-black" id="issuedate" name="issuedate"onChange={(e) => setIssuedate(e.target.value)} required/>
        </div>
        <button className="border-2 bg-orange-700 hover:bg-orange-400 mt-6 ml-20" type="submit" >Issue Certificate</button></div>
        </form>
      </div>
    </div>
  </div>
</>  )
}

export default IssueCertificate