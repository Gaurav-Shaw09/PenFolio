import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import BlogDetails from "./components/BlogDetails";
import Profile from "./components/Profile";
import EditBlog from "./components/EditBlog";
import NotFound from "./components/NotFound"; // Create this component

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/blog/:id" element={<BlogDetails />} />
                    <Route path="/profile/:username" element={<Profile />} /> {/* Profile with Username */}
                    <Route path="/profile" element={<Profile />} /> {/* Default Profile Route */}
                    <Route path="/" element={<Login />} /> {/* Default to Login */}
                    <Route path="/edit-blog/:id" element={<EditBlog />} />
                    <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;