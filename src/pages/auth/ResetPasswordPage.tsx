import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ImageWithBasePath from '../../components/imageWithBasePath';
import { all_routes } from '../../routes/all_routes';
import Button from '../../common/Button';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError('Please fill in both fields.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError(null);
    console.log("Password successfully reset!");

    navigate(all_routes.home);
  };

  return (
    <>
      <div className="content" style={{ paddingTop: '116px' }}>
        <div className="container-fluid">
          <div className="row">

            <div className="col-md-10 col-lg-6 mx-auto">

              <div className="account-content rounded-3 shadow-lg p-4 p-md-5">

                <div className="login-header text-center">
                  <ImageWithBasePath
                    src="assets/images/auth-section/password-lock.png"
                    alt="Setup Password"
                    className="mb-3"
                    style={{ height: '120px' }}
                  />
                  <h3 className="mb-0">Setup New Password</h3>
                </div>

                <form onSubmit={handlePasswordSubmit}>

                  <div className="mb-3">
                    <div className="pass-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control pass-input"
                        placeholder="Enter your new Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span
                        className={`feather ${showPassword ? 'feather-eye' : 'feather-eye-off'} toggle-password`}
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="pass-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control pass-input"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="alert alert-danger text-center" role="alert">
                      {error}
                    </div>
                  )}

                  <div className="mb-3">

                    <Button type="submit" fullWidth={true}>
                      Submit
                    </Button>
                  </div>

                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;