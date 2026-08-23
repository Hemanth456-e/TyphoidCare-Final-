import React,{useState} from "react";
import {HeartPulse,ShieldCheck,Building2,UserRound,LockKeyhole,Eye,EyeOff} from "lucide-react";

function Network(){
 return <div className="network">
  <div className="ring r1"/><div className="ring r2"/>
  <div className="heart"><HeartPulse size={118}/></div>
  <div className="hospital h1"><Building2/><b>+</b></div>
  <div className="hospital h2"><Building2/><b>+</b></div>
  <div className="hospital h3"><Building2/><b>+</b></div>
  <i className="dot d1"/><i className="dot d2"/><i className="dot d3"/><i className="dot d4"/>
 </div>
}

export default function LoginPage({onLogin}){
 const [role,setRole]=useState("Admin"),[show,setShow]=useState(false),[msg,setMsg]=useState("");
 return <main className="page">
  <section className="left">
   <div className="brand"><div className="brandIcon"><HeartPulse/></div><div><b>Heart Disease</b><span>FL System</span></div></div>
   <div className="intro">
    <h1>Heart Disease</h1><h2>Federated Learning</h2>
    <p>Privacy-Preserving AI for<br/>Better Healthcare</p><Network/>
   </div>
   <div className="safe"><ShieldCheck/><div><strong>Your data is safe.</strong><p>We use Federated Learning to<br/>protect patient privacy.</p></div></div>
  </section>
  <section className="right">
   <form className="card" onSubmit={e=>{e.preventDefault(); if(onLogin) onLogin(role); else setMsg(`Demo login selected: ${role}`)}}>
    <div className="welcome"><h2>Welcome Back</h2><p>Sign in to continue</p></div>
    <label>Username or Email</label>
    <div className="field"><UserRound/><input placeholder="Username or Email"/></div>
    <label>Password</label>
    <div className="field"><LockKeyhole/><input type={show?"text":"password"} placeholder="Password" defaultValue="demo"/><button type="button" onClick={()=>setShow(!show)}>{show?<EyeOff/>:<Eye/>}</button></div>
    <div className="role"><label>Login as</label><div className="select"><UserRound/><select value={role} onChange={e=>setRole(e.target.value)}><option>Admin</option><option>Hospital</option><option>User</option></select></div></div>
    <button className="signin">Sign In</button>
    <button className="forgot" type="button" onClick={()=>setMsg("Password recovery is a demo action.")}>Forgot password?</button>
    {msg&&<div className="msg">{msg}</div>}
    <div className="footer">© 2025 Heart Disease FL System</div>
   </form>
  </section>
 </main>
}