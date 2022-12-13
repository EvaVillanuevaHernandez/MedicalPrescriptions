import React, { Component } from 'react';
import { Carousel, CarouselItem, CarouselControl, CarouselCaption } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../../components/NavBar/NavBar';
import * as BsIcons from 'react-icons/bs';
import * as MdIcons from 'react-icons/md';
import './Home.scss'
const items = [
  {
    src: "/images/slider3.jpg",
    altText: 'Slide_1'
  },
  
  {
    src: "/images/slider1.jpg",
    altText: 'Slider_2'
  },
  {
    src: "/images/slider2.jpg",
    altText: 'Slide_3'
  },
 
];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}

        >
          <img src={item.src} alt={item.altText} className="caru" />
          <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
        </CarouselItem>
      );
    });

    return (
      <>
        <NavBar />
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
        >
          {slides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
        </Carousel>

        <div className='info-home'>
          <h3>Pide cita con nosotros</h3>
          <p><BsIcons.BsTelephone />
            +36 627645300</p>
          <p><MdIcons.MdWeb />
            A través de nuestra web</p>
        </div>


      </>
    );
  }
}

export default Home;