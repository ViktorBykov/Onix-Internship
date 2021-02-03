import logo_blue from './logo_blue.svg';
import logo_white from './logo_white.svg';
import github_logo from './github_logo.svg';
import dribbble_logo from './dribbble_logo.svg';
import onix_logo_sm from './onix_logo_sm.svg';
import './App.css';

function App() {
  return (
    <div className="App">

        {/* Header */}
        <header>
            <div className="header__logo">
                <img src={logo_blue} alt="Onix logo" width="117" height="30"/>
            </div>
            <div className="header__title">
                React Internship
            </div>
        </header>

        {/* Main section */}
        <div className="main_section">
            <div className="main_section__content">
            <div className="main_section__content__wrapper">
                <div className="main_section__content__logo">
                    <img src={logo_white} alt="Onix logo"/>
                </div>
            </div>
            <div className="main_section__content__wrapper">
                    <h2>internship</h2>
                    <h3>react 02.2021</h3>
            </div>
            </div>
        </div>

        {/* Description section */}
        <div className="description_section">
            <h4 className="description_section__title">
                Onix React Internship це
            </h4>
            <ol className="description_section__items">
                <li>13 офлайн-занять в офісі Onix</li>
                <li>Kомунікація з ментором та іншими учнями</li>
                <li>Практичні завдання на кожну тему</li>
                <li>Сертифікат про закінчення</li>
            </ol>
        </div>

        {/* Discussion section */}
        <div className="discussion_section">
            <h4 className="discussion_section__title">
                Матеріал для обговорення
            </h4>
            <div className="discussion_section__items__wrapper">
                <div className="discussion_section__item">
                    <div className="discussion_section__item__title">
                        <h5>Система контролю версій</h5>
                        <span></span>
                    </div>
                    <div className="discussion_section__item__content">
                        <pre>
                            &gt; tar -zxf git-2.8.0.tar.gz<br/>
                            &gt; cd git-2.8.0<br/>
                            &gt; make configure<br/>
                            &gt; ./configure --prefix=/usr<br/>
                            &gt; make all doc info<br/>
                            &gt; sudo make install install-doc install-html install-info<br/>
                        </pre>
                    </div>
                </div>
                <div className="discussion_section__item">
                    <div className="discussion_section__item__title">
                        <h5>Git</h5>
                        <span></span>
                    </div>
                    <div className="discussion_section__item__content">
                        <pre>
                            &gt; git init<br/>
                            &gt; touch README.md<br/>
                            &gt; git add README.md<br/>
                            &gt; git commit -m "[create repository]"<br/>
                        </pre>
                    </div>
                </div>
                <div className="discussion_section__item">
                    <div className="discussion_section__item__title">
                        <h5>Node.js</h5>
                        <span></span>
                    </div>
                    <div className="discussion_section__item__content">
                        <pre>
                            &gt; cinst nodejs.install<br/>
                            &gt; node --version<br/>
                        </pre>
                    </div>
                </div>
                <div className="discussion_section__item">
                    <div className="discussion_section__item__title">
                        <h5>Менеджер пакетів</h5>
                        <span></span>
                    </div>
                    <div className="discussion_section__item__content">
                        <pre>
                            &gt; npm init<br/>
                            &gt; npm -v<br/>
                        </pre>
                    </div>
                </div>
                <div className="discussion_section__item">
                    <div className="discussion_section__item__title">
                        <h5>HTML</h5>
                        <span></span>
                    </div>
                    <div className="discussion_section__item__content">
                        <pre>
                            &lt;!DOCTYPE html&gt;<br/>
                            &lt;html lang=&quot;en&quot;&gt;<br/>
                            &lt;head&gt;<br/>
                            &lt;meta charset=&quot;UTF-8&quot;&gt;<br/>
                            &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;<br/>
                            <br/>
                            &lt;title&gt;Document&lt;/title&gt;<br/>
                            &lt;/head&gt;<br/>
                            &lt;body&gt;<br/>
                        </pre>
                    </div>
                </div>
                <div className="discussion_section__item">
                    <div className="discussion_section__item__title">
                        <h5>CSS</h5>
                        <span></span>
                    </div>
                    <div className="discussion_section__item__content">
                        <pre>
                            @font-face <br/>
                            font-family: "Lato Regular";<br/>
                            src: url("../fonts/lato-regular-webfont.woff2") format("woff2");<br/>
                            font-style: normal;<br/>
                            font-weight: normal;<br/>
                        </pre>
                    </div>
                </div>
            </div>
        </div>

        {/* Footer */}
        <footer>
            <div className="footer__content">
                <span className="author_name">Viktor Bykov</span>
                <div className="links_wrapper">
                    <a className="github_link" href="https://github.com/ViktorBykov/Onix-Internship" target="_blank" rel="noreferrer noopener">
                        <img src={github_logo} alt="Github logo"/>
                    </a>
                    <a className="dribbble_link" href="https://dribbble.com/shots/14852813-Design-agency-Web-page-Freebie" target="_blank" rel="noreferrer noopener">
                        <img src={dribbble_logo} alt="Dribbble logo"/>
                    </a>
                    <a className="onix_link" href="https://onix.kr.ua/" target="_blank" rel="noreferrer noopener">
                        <img src={onix_logo_sm} alt="Onix small logo"/>
                    </a>
                </div>
            </div>
        </footer>

    </div>
  );
}

export default App;
