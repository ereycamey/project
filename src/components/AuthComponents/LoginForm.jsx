import React  from "react";
import { signInUser } from "../../redux/ActionCreators/authActionCreators";
import { useDispatch } from "react-redux";

const LoginForm = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
      e.preventDefault();
      if ( !email || !password) {
        alert("Please fill in all fields");
        return;
      }
      dispatch (signInUser (email, password));
    };
     return (
        <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="form-group my-2">
              <input type="email" name="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group my-2">
              <input type="password" name="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary my-2 form-control">
                Login
                </button>
        </form>
    )
}

export default LoginForm;