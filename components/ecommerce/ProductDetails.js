import { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from "../../redux/action/cart";
import { addToCompare } from "../../redux/action/compareAction";
import { addToWishlist } from "../../redux/action/wishlistAction";
import ProductTab from "../elements/ProductTab";
import RelatedSlider from "../sliders/Related";
import ThumbSlider from "../sliders/Thumb";

const ProductDetails = ({
  product,
  cartItems,
  addToCompare,
  addToCart,
  addToWishlist,
  increaseQuantity,
  decreaseQuantity,
  quickView,
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleCart = (product) => {
    addToCart(product);
    toast("Product added to Cart!");
  };

  const handleCompare = (product) => {
    addToCompare(product);
    toast("Added to Compare list!");
  };

  const handleWishlist = (product) => {
    addToWishlist(product);
    toast("Added to Wishlist!");
  };

  const inCart = cartItems.find((cartItem) => cartItem.id === product.id);

  return (
    <section className="my-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="card p-4">
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="position-relative">
                    <span className="position-absolute top-0 start-0 badge bg-danger">Sale Off</span>
                    <ThumbSlider product={product} />
                  </div>
                </div>
                <div className="col-md-6">
                  <h2>{product.title}</h2>
                  <div className="mb-2">
                    <small className="text-muted">(32 reviews)</small>
                  </div>
                  <div className="mb-3">
                    <h4 className="text-primary">{product.price} tk</h4>
                    {product.oldPrice && (
                      <>
                        <small className="text-danger me-2">
                          {product.discount.percentage}% Off
                        </small>
                        <del className="text-muted">{product.oldPrice} tk</del>
                      </>
                    )}
                  </div>
                  <p>{product.desc}</p>

                  <div className="d-flex align-items-center mb-3">
                    <button
                      className="btn btn-outline-secondary me-2"
                      onClick={() =>
                        !inCart
                          ? setQuantity(quantity > 1 ? quantity - 1 : 1)
                          : decreaseQuantity(product.id)
                      }
                    >
                      -
                    </button>
                    <span>{inCart?.quantity || quantity}</span>
                    <button
                      className="btn btn-outline-secondary ms-2"
                      onClick={() =>
                        !inCart
                          ? setQuantity(quantity + 1)
                          : increaseQuantity(product.id)
                      }
                    >
                      +
                    </button>
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-success"
                      onClick={() =>
                        handleCart({
                          ...product,
                          quantity: quantity || 1,
                        })
                      }
                    >
                      Add to Cart
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleWishlist(product)}
                    >
        
                                                     <i className="fi-rs-heart"></i>                                        
                    </button>
                    {/* <button
                      className="btn btn-outline-info"
                      onClick={() => handleCompare(product)}
                    >
                      <i className="bi bi-shuffle"></i>
                    </button> */}
                  </div>

                  <ul className="list-unstyled mt-4">
                    <li>
                      <strong>SKU:</strong> <span>FWM15VKT</span>
                    </li>
                    <li>
                      <strong>Tags:</strong> <span>grocery</span>
                    </li>
                    <li>
                      <strong>Availability:</strong>
                      <span className="text-success ms-1">
                        {product.stock} Items In Stock
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {!quickView && (
                <>
                  <div className="mt-5">
                    <ProductTab />
                  </div>
                  <div className="mt-5">
                    <h3>Related Products</h3>
                    <RelatedSlider />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  cartItems: state.cart,
});

const mapDispatchToProps = {
  addToCompare,
  addToWishlist,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
