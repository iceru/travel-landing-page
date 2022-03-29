import React from "react";
import PropTypes from "prop-types";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const propTypes = {
  currentPage: PropTypes.number,
};

const SkeletonProducts = ({ currentPage }) => {
  return (
    <SkeletonTheme height={38}>
      {currentPage < 2 && (
        <>
          <Skeleton className="mb-4" />

          <div className="row mb-4">
            <div className="col-6 col-lg mb-3 mb-lg-0">
              <Skeleton />
            </div>
            <div className="col-6 col-lg mb-3 mb-lg-0">
              <Skeleton />
            </div>
            <div className="col-6 col-lg mb-3 mb-lg-0">
              <Skeleton />
            </div>
            <div className="col-6 col-lg mb-3 mb-lg-0">
              <Skeleton />
            </div>
            <div className="col-12 col-lg mb-3 mb-lg-0">
              <Skeleton />
            </div>
          </div>
        </>
      )}

      <div className="row">
        {[...Array(9)].map((item, i) => (
          <div key={i} className="col-12 col-lg-4 mb-4">
            <Skeleton className="mb-2" height={200} />
            <Skeleton className="mb-2" width="50%" height={20} />
            <Skeleton className="mb-2" width="75%" height={20} />
            <Skeleton className="mb-2" width="25%" height={20} />
            <Skeleton className="mb-2" count={2} height={20} />
          </div>
        ))}
      </div>
    </SkeletonTheme>
  );
};

SkeletonProducts.propTypes = propTypes;

export default SkeletonProducts;
