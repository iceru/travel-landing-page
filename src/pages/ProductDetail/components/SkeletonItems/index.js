import React from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";

const propTypes = {
  skeletonItemShow: PropTypes.string,
};

const SkeletonItems = ({ skeletonItemShow }) => {
  return (
    <div className="productSkeleton mb-4" style={{ display: skeletonItemShow }}>
      <Skeleton height={30} width="30%" className="mb-3" />

      {[...Array(2)].map((i) => (
        <div key={i} className="row align-items-center mb-3">
          <div className="col-4">
            <Skeleton height={20} width="50%" className="mb-2" />
            <Skeleton height={80} width="30%" className="mb-2" />
            <Skeleton height={15} count={3} width="70%" className="mb-2" />
          </div>
          <div className="col-1 ms-auto">
            <Skeleton height={35} width="100%" />
          </div>
        </div>
      ))}
    </div>
  );
};

SkeletonItems.propTypes = propTypes;

export default SkeletonItems;
