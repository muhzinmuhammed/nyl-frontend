import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { InputOtp } from 'primereact/inputotp';
import ImageWithBasePath from '../../components/imageWithBasePath';
import { all_routes } from '../../routes/all_routes';
import Button from '../../common/Button';

const OtpVerificationPage = () => {
  const [token, setTokens] = useState<string | number | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("OTP Verified:", token);

    const from = location.state?.from;

    if (from === 'register') {
      navigate(all_routes.newPassword);
    } else {
      navigate(all_routes.resetPassword);
    }
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
                    src="assets/images/auth-section/otp-phone.png"
                    alt="OTP Verification"
                    className="mb-3"
                    style={{ height: '120px' }}
                  />

                  <h3 className="mb-0">Verifying OTP</h3>
                  <p className="text-muted">
                    Enter the 6-digit code that send to your mobile number.
                    <br />
                    This code is valid for next 5 minutes
                  </p>
                </div>

                <form onSubmit={handleVerifyOtp}>

                  <div className="otp-box">
                    <div className="mb-3 d-flex justify-content-center">
                      <InputOtp
                        value={token}
                        onChange={(e) => setTokens(e.value ?? null)}
                        length={6}
                        integerOnly
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="account-signup text-center">
                      <p>
                        Didn't receive OTP?{" "}
                        <Link to="#">Resend again</Link>
                      </p>
                    </div>
                  </div>

                  <div className="mb-3">

                    <Button type="submit" variant="dark" fullWidth={true}>
                      Verify OTP
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

export default OtpVerificationPage;