import { useState } from 'react';
import { Link } from 'react-router-dom';
import ImageWithBasePath from '../../components/imageWithBasePath';
import { all_routes } from '../../routes/all_routes';
import Button from '../../common/Button';


const countryData = [
  {
    name: 'India',
    code: 'IN',
    prefix: '+91',
    flag: 'https://flagcdn.com/in.svg'
  },
  {
    name: 'United States',
    code: 'US',
    prefix: '+1',
    flag: 'https://flagcdn.com/us.svg'
  },
];

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>();
  const [showPassword, setShowPassword] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState(countryData[0]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCountrySelect = (country: typeof countryData[0]) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Phone:", phoneNumber);
  };

  return (
    <>
      <div className="content" style={{ paddingTop: '116px' }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <div className="account-content rounded-3 overflow-hidden shadow-lg">
                <div className="row align-items-center justify-content-center g-0">
                  <div className="col-md-7 col-lg-6 login-left p-0">
                    <ImageWithBasePath
                      src='assets/images/auth-section/login-right-image.jpg'
                      className="img-fluid h-100"
                      alt="Nyl Login"
                      style={{ objectFit: 'cover', minHeight: '500px' }}
                    />
                  </div>
                  <div className="col-md-12 col-lg-6 login-right">
                    <div className="login-header text-center">
                      <ImageWithBasePath
                        src="assets/images/nyl/nyl-logo.png"
                        alt="Nyl Healing Logo"
                        className="mb-3"
                        style={{ height: '170px' }}
                      />
                      <h3 className="mb-0">Welcome Back To NYL Healing</h3>
                      <p className="text-muted">Energy Healing Without Needles</p>
                    </div>

                    <form onSubmit={handleLogin}>

                      <div className="mb-3">
                        <div className="row g-2">

                          <div className="col-4">
                            <div
                              className="form-control d-flex align-items-center justify-content-between h-100"
                              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                              style={{ cursor: 'pointer', position: 'relative' }}
                            >
                              <img
                                src={selectedCountry.flag}
                                alt={selectedCountry.name}
                                style={{ width: '30px' }}
                              />
                              <i className="fas fa-chevron-down" style={{ fontSize: '0.8rem', color: '#6c757d' }} />

                              {isDropdownOpen && (
                                <div
                                  className="bg-white rounded-2 shadow-lg"
                                  style={{ position: 'absolute', top: '100%', left: '0', width: '100%', zIndex: 100 }}
                                >
                                  {countryData.map((country) => (
                                    <div
                                      key={country.code}
                                      onClick={() => handleCountrySelect(country)}
                                      className="p-2"
                                      style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                    >
                                      <img
                                        src={country.flag}
                                        alt={country.name}
                                        style={{ width: '30px', marginRight: '10px' }}
                                      />
                                      {country.name} ({country.prefix})
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="col-8">
                            <div className="pass-group h-100">
                              <span
                                className="toggle-password"
                                style={{
                                  left: '15px',
                                  zIndex: 3,
                                  color: '#000',
                                  fontSize: '1rem',
                                  top: '50%',
                                  transform: 'translateY(-50%)'
                                }}
                              >
                                {selectedCountry.prefix}
                              </span>
                              <input
                                type="tel"
                                className="form-control pass-input h-100"
                                placeholder="Enter Mobile Number"
                                style={{ paddingLeft: '60px' }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="pass-group">

                          <span
                            className="feather feather-lock toggle-password"
                            style={{ left: '15px', zIndex: 3 }}
                          />
                          <input
                            type={showPassword ? "text" : "password"}
                            className="form-control pass-input"
                            placeholder="Enter your Password"
                            style={{ paddingLeft: '45px' }}
                          />

                          <span
                            className={`feather ${showPassword ? 'feather-eye' : 'feather-eye-off'} toggle-password`}
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ cursor: 'pointer' }}
                          />
                        </div>
                      </div>

                      <div className="text-end mb-3">
                        <Link
                          to={all_routes.forgotPassword}
                          className="forgot-link"
                        >
                          Forgot password?
                        </Link>
                      </div>

                      <div className="mb-3">
                        <Button type="submit" fullWidth={true}>
                          Login
                        </Button>
                      </div>

                      <div className="account-signup text-center">
                        <p>
                          Don't have an account yet?{" "}
                          <Link to={all_routes.register}>Sign up</Link>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;