import React,{useState} from "react";
import {HeartPulse,ShieldCheck,Building2,UserRound,LockKeyhole} from "lucide-react";

export default function App(){
 const [role,setRole]=useState("Admin");
 const submit=e=>{e.preventDefault();alert(`Demo login selected: ${role}`)};
 return <div className="login">
  <div className="login-left">
   <div className="brand"><div className="logo"><HeartPulse/></div><div><b>Heart Disease</b><span>Federated Learning</span></div></div>
   <div className="brand-copy"><h1>Heart Disease</h1><h2>Federated Learning</h2><p>Privacy-Preserving AI for<br/>Better Healthcare</p>
    <div className="heart-art"><HeartPulse size={145}/><Building2 className="node a"/><Building2 className="node b"/><Building2 className="node c"/></div>
   </div>
   <div className="safe"><ShieldCheck/><div><b>Your data is safe.</b><p>We use Federated Learning to protect patient privacy.</p></div></div>
  </div>
  <div className="login-right"><form className="login-card" onSubmit={submit}>
   <div className="welcome"><h2>Welcome Back</h2><p>Sign in to continue</p></div>
   <label>Username or Email</label><div className="field"><UserRound size={16}/><input placeholder="Username or Email"/></div>
   <label>Password</label><div className="field"><LockKeyhole size={16}/><input type="password" placeholder="Password" defaultValue="demo"/></div>
   <div className="role-row"><label>Login as</label><select value={role} onChange={e=>setRole(e.target.value)}><option>Admin</option><option>Hospital</option><option>User</option></select></div>
   <button className="primary">Sign In</button><button className="link" type="button">Forgot password?</button>
   <div className="copyright">© 2026 Heart Disease FL System</div>
  </form></div>
 </div>
}