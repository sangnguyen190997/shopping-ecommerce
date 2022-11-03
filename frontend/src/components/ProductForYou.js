import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";

export default function ProductForYou({ listProduct }) {
  const settings = {
    className: "center",
    infinite: true,
    autoplay: true,
    slidesToShow: 4,
    speed: 500,
    autoplaySpeed: 3000,
    cssEase: "linear",

    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <Fragment>
      <Slider {...settings}>
        {listProduct?.map((item, index) => {
          return (
            <div className="shadow " key={index}>
              <div className="product text-center">
                <div className="position-relative mb-3">
                  <div className="badge text-white badge-secondary"></div>
                  <NavLink className="d-block" to={`/detail/${item.id}`}>
                    <img
                      className="img-fluid w-100"
                      style={{ height: "300px" }}
                      src={item.img1}
                      alt={item.img1}
                    />
                  </NavLink>
                  <div className="product-overlay">
                    <ul className="mb-0 list-inline">
                      <li className="list-inline-item">
                        <NavLink
                          className="btn btn-sm btn-dark"
                          to={`/detail/${item.id}`}
                        >
                          Add to cart
                        </NavLink>
                      </li>
                      <li className="list-inline-item mr-0">
                        {/* Dùng Modal phải có href để nó hiện ra thằng đó và thuộc tính data-toggle="modal" để mở modal*/}
                        <a
                          className="btn btn-sm btn-outline-dark"
                          href={`#product_${item.id}`}
                          data-toggle="modal"
                        >
                          <i className="fas fa-expand"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="px-3">
                  <h6>
                    <a className="reset-anchor" href="detail.html">
                      <p className="d-block"> {item.name}</p>
                    </a>
                  </h6>
                  <p className="small text-muted">${item.price}</p>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
      <div className="py-5">
        <section className="py-5 bg-light">
          <div className="container">
            <div className="row text-center">
              <div className="col-lg-4 mb-3 mb-lg-0">
                <div className="d-inline-block">
                  <div className="media align-items-end">
                    <svg className="svg-icon svg-icon-big svg-icon-light">
                      <use xlinkHref="#delivery-time-1"></use>
                    </svg>
                    <div className="media-body text-left ml-3">
                      <h6 className="text-uppercase mb-1">Free shipping</h6>
                      <p className="text-small mb-0 text-muted">
                        Free shipping worlwide
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-3 mb-lg-0">
                <div className="d-inline-block">
                  <div className="media align-items-end">
                    <svg className="svg-icon svg-icon-big svg-icon-light">
                      <use xlinkHref="#helpline-24h-1"> </use>
                    </svg>
                    <div className="media-body text-left ml-3">
                      <h6 className="text-uppercase mb-1">24 x 7 service</h6>
                      <p className="text-small mb-0 text-muted">
                        Free shipping worlwide
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="d-inline-block">
                  <div className="media align-items-end">
                    <svg className="svg-icon svg-icon-big svg-icon-light">
                      <use xlinkHref="#label-tag-1"> </use>
                    </svg>
                    <div className="media-body text-left ml-3">
                      <h6 className="text-uppercase mb-1">Festival offer</h6>
                      <p className="text-small mb-0 text-muted">
                        Free shipping worlwide
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section className="py-5">
        <div className="container p-0">
          <div className="row">
            <div className="col-lg-6 mb-3 mb-lg-0">
              <h5 className="text-uppercase">Let's be friends!</h5>
              <p className="text-small text-muted mb-0">
                Welcome to my shop ecommerece!!!
              </p>
            </div>
            <div className="col-lg-6">
              <form action="#">
                <div className="input-group flex-column flex-sm-row mb-3">
                  <input
                    className="form-control form-control-lg py-3"
                    type="email"
                    placeholder="Enter your email address"
                    aria-describedby="button-addon2"
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-dark btn-block"
                      id="button-addon2"
                      type="submit"
                    >
                      Subscribe
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
