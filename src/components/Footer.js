import React from 'react';

const Footer = () => {
    return (
        <footer className="app-footer">
            <p>&copy; 2025 CarScope. All rights reserved.</p>
            <div>
                <a href="/policy">개인정보처리방침</a> | 
                <a href="/terms">이용약관</a> | 
                <a href="/contact">문의하기</a>
            </div>
        </footer>
    );
};

export default Footer;