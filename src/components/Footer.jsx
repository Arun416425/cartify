import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div>
            <footer className="footer">
                <div className="footer-container">

                    <div className="footer-section">
                        <h2>Cartify</h2>
                            <p>Premium products curated for a premium lifestyle.</p>
                    </div>

                    <div className="footer-section">
                        <h3>Quick Links</h3>
                        <Link to="/">Home</Link>
                        <Link to="/cart">Cart</Link>
                    </div>

                    <div className="footer-section">
                        <h3>Contact</h3>
                        <p>Email: support@cartify.com</p>
                        <p>Phone: +91 9856647126</p>
                    </div>

                </div>

                <div className="footer-bottom">
                    <p>© 2026 Cartify. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}

export default Footer