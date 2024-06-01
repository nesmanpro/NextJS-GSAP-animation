import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { useEffect, useRef } from "react";
import img from '../../public/img/hero.jpg'


gsap.registerPlugin(Flip);

const IndexContainer = () => {


    const preloaderBackgroundRef = useRef(null);
    const preloaderTextRef = useRef(null);
    const heroTitleRefs = useRef([]);
    const heroImageStartRef = useRef(null);
    const heroCaptionRef = useRef(null);
    const heroButtonRef = useRef(null);
    const heroImageWrapperRef = useRef(null);
    const heroImageRef = useRef(null);
    const headerItemsRef = useRef([]);

    useEffect(() => {
        const preloaderBackground = preloaderBackgroundRef.current;
        const preloaderText = preloaderTextRef.current;
        const heroTitle = heroTitleRefs.current;
        const heroImageStart = heroImageStartRef.current;
        const heroCaption = heroCaptionRef.current;
        const heroButton = heroButtonRef.current;
        const heroImageWrapper = heroImageWrapperRef.current;
        const heroImage = heroImageRef.current;
        const headerItems = headerItemsRef.current;



        const master = gsap.timeline();


        const setInitialState = () => {

            gsap.set(headerItems, {
                y: 24,
                autoAlpha: 0
            });

            gsap.set(heroButton, {
                y: 64,
                autoAlpha: 0
            });

            gsap.set([preloaderText, heroTitle, heroCaption], {
                yPercent: 100
            })
        }

        const preloaderAnimation = () => {
            const tl = gsap.timeline({
                defaults: {
                    ease: 'power2.out'
                }
            });



            tl.to(preloaderText, {
                yPercent: 0,
                delay: 0.3
            })
                .to(preloaderText, {
                    yPercent: -105,
                    delay: 1
                })
                .to(preloaderBackground, {
                    yPercent: -100,
                    duration: 1.5,
                    ease: 'power4.inOut'
                }, '<')

            return tl;

        }

        const heroImageAnimation = () => {
            const tl = gsap.timeline({
                defaults: {
                    ease: 'power3.inOut',
                    duration: 2
                }
            });


            const state = Flip.getState(heroImageWrapper);

            heroImageStart.appendChild(heroImageWrapper);

            tl.from(heroImage, { scale: 1.07 })
                .to(heroImageWrapper, { borderRadius: '15px' }, '<')
                .add(() => {
                    Flip.from(state, {
                        duration: 2,
                        ease: 'power3.inOut'
                    });
                }, '<');

            return tl;
        }


        const UIanimation = () => {

            const tl = gsap.timeline({

                delay: 0.5,
                defaults: {
                    ease: 'power3.out',
                    duration: 1.7,
                    yPercent: 0,
                    y: 0
                }

            });

            tl.to(heroCaption, {
                duration: 1.2,
                ease: 'power3.inOut'
            })
                .to(heroTitle, {
                    stagger: 0.2
                }, '-=0.9')
                .to(heroButton, {
                    autoAlpha: 1
                }, 0.5)
                .to(headerItems, {
                    autoAlpha: 1
                }, 0.5)


            return tl
        }



        master
            .add(setInitialState())
            .add(preloaderAnimation())
            .add(heroImageAnimation(), '-=1.5')
            .add(UIanimation(), '<')


    }, []);


    return (
        <div>
            <div ref={heroImageStartRef} className="hero-image-start"></div>
            <div className="preloader">
                <p className="preloader__text">
                    <span ref={preloaderTextRef}>Portfolio 2024</span>
                </p>
                <div
                    className="preloader__background"
                    ref={preloaderBackgroundRef}
                ></div>
            </div>
            <header className="header">
                <p className="header__menu" ref={(el) => headerItemsRef.current.push(el)}>
                    nesmanpro
                </p>
                <p className="header__logo" ref={(el) => headerItemsRef.current.push(el)}>
                    NMP
                </p>
                <button className="button" ref={(el) => headerItemsRef.current.push(el)}>
                    My Work
                </button>
            </header>
            <div className="hero__wrapper">
                <section className="hero">
                    <div className="hero__image" ref={heroImageWrapperRef}>
                        <img src={img} alt="N3 Bike" ref={heroImageRef} />
                    </div>
                    <div className="hero__content">
                        <p className="hero__caption">
                            <span ref={heroCaptionRef}>Modern aesthetics for your identity.</span>
                        </p>
                        <h1 className="hero__title">
                            <span>
                                <span ref={(el) => heroTitleRefs.current.push(el)}>Creative designs,</span>
                            </span>
                            <span>
                                <span ref={(el) => heroTitleRefs.current.push(el)}>Lasting impact.</span>
                            </span>
                        </h1>
                        <button
                            className="hero__button button button--white"
                            ref={heroButtonRef}
                        >
                            Check it out
                        </button>
                    </div>
                </section>
            </div>
        </div>
    )
}



export default IndexContainer;