import React, { Component } from 'react';
import QRCode from 'qrcode';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { messages: [] }; // <- set up react state
    }
    componentDidMount() {
        this.generateQR();
    }
    generateQR() {
        var dummyCanvas = document.createElement("canvas");        //Just for drawing first
        let link = 'https://graffiti-85757.firebaseapp.com/channel/' + encodeURI(this.refs.input.value);
        this.refs.channelLink.href = link;
        this.refs.channelLink.innerHTML = link;


        var canvas = this.refs.qrCanvas;
        var logo = this.refs.logo;
        QRCode.toCanvas(dummyCanvas, link, {'color.light': '#00000000'}, function (error) {
            if (error) console.error(error)
            let ctx = canvas.getContext("2d");
            canvas.height = dummyCanvas.height + 100;
            canvas.width = dummyCanvas.width;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            //ctx.fillStyle="#F5F5F5";
            //ctx.fillRect(0,0,canvas.width,100);

            ctx.drawImage(logo, canvas.width / 2 - 50, 0, 100, 100)


            ctx.drawImage(dummyCanvas, 0, 100);
        })

    }
    downladLinkClicked() {
        var img = this.refs.qrCanvas.toDataURL()
        var iframe = '<iframe src="' + img + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'
        var x = window.open();
        x.document.open();
        x.document.write(iframe);
        x.document.close();
    }
    handleImageLoaded() {
        this.scrollToBottomIfNeeded();
    }
    componentDidUpdate() {
        this.scrollToBottomIfNeeded();
    }
    render() {
        return (
            <div>
                <nav className="navbar is-fixed-top" aria-label="main navigation">
                    <div className="navbar-brand">
                        <a className="navbar-item" href="https://bulma.io">
                            <img src="/logo203.png" alt="Logo" ref='logo'/>
                        </a>

                        {/* <h1 className="navbar-item">Graffit - Talk what you want to talk about</h1> */}
                        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">

                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>
                </nav>
                <article className="container">
                    <section className="section">
                        <h1 className="title">Talk what you want to talk about</h1>
                        <p className="subtitle">Grafit makes it possible</p>
                        <p>In Grafit you can talk to anybody. Create your own Channel.</p>
                    </section>
                    <section className="section">
                        <form className="form">
                            <label className="label">Create your channel</label>
                            <div className="control field">
                                <input className="input" onInput={this.generateQR.bind(this)} type="text" placeholder="Name" ref="input" />
                            </div>
                        </form>
                        <p>
                            <a ref="channelLink">Channel</a>
                        </p>
                        <canvas ref="qrCanvas"></canvas>
                        <p></p>
                        <a ref="downloadLink" onClick={this.downladLinkClicked.bind(this)}>Download</a>
                    </section>
                </article>
            </div>
        );
    }
}

export default App;