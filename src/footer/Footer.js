import React from 'react';
import github_logo from '../assets/images/github_logo.svg';
import dribbble_logo from '../assets/images/dribbble_logo.svg';
import onix_logo_sm from '../assets/images/onix_logo_sm.svg';

import './Footer.css';

class Footer extends React.Component {
    constructor(){
        super();
        this.state = {
            authorName: "Viktor Bykov",
            gitHubLink: "https://github.com/ViktorBykov/Onix-Internship",
            designLink: "https://dribbble.com/shots/14852813-Design-agency-Web-page-Freebie",
            designLink2: "https://onix.kr.ua/"
        }
    }

    render(){
        const {authorName} = this.state;
        const {gitHubLink} = this.state;
        const {designLink} = this.state;
        const {designLink2} = this.state;

        return(
            <footer>
                <div className="footer__content">
                    <span className="author_name">{authorName}</span>
                    <div className="links_wrapper">
                        <a className="github_link" href={gitHubLink} target="_blank" rel="noreferrer noopener">
                            <img src={github_logo} alt="Github logo"/>
                        </a>
                        <a className="dribbble_link" href={designLink} target="_blank" rel="noreferrer noopener">
                            <img src={dribbble_logo} alt="Dribbble logo"/>
                        </a>
                        <a className="onix_link" href={designLink2} target="_blank" rel="noreferrer noopener">
                            <img src={onix_logo_sm} alt="Onix small logo"/>
                        </a>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
