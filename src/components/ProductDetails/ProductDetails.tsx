import { FC, useEffect } from "react";
import "./ProductDetails.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectProductDetails,
  fetchProductDetails,
} from "../../redux/productSlice";
export const ProductDetails: FC = () => {
  const dispatch = useAppDispatch();
  const productDetails = useAppSelector(selectProductDetails);

  useEffect(() => {
    dispatch(fetchProductDetails());
  }, [dispatch]);

  return (
    <div className="aside-container">
      <div className="image-container">
        <img src={productDetails?.image} alt="product-image"></img>
      </div>
      <h1>{productDetails?.title}</h1>
      <p className="product-subtitle">{productDetails?.subtitle}</p>
      <hr className="solid"></hr>
      <div className="tabs">
        {productDetails?.tags.map((tag, index) => (
          <span className="tab-container" key={index}>
            {tag}
          </span>
        ))}
      </div>
      <hr className="solid"></hr>
    </div>
  );
};
