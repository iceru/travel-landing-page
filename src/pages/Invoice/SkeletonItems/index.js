import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonItems = () => {
  return (
    <div className="productSkeleton mb-4">
      <Skeleton height={40} width="100%" className="mb-4" />
      <Skeleton width="100%" className="mb-3" />
      <Skeleton height={15} width="40%" className="mb-2" />
      <Skeleton height={15} width="40%" className="mb-4" />

      <div className="row align-items-center mb-4">
        <div className="col-12 col-lg-6">
          <Skeleton height={15} count={4} width="70%" className="mb-2" />
        </div>
        <div className="col-12 col-lg-6">
          <Skeleton height={15} count={4} width="70%" className="mb-2" />
        </div>
      </div>

      <Skeleton height={15} width="30%" className="mb-2" />
      <Skeleton height={15} width="50%" className="mb-4" />

      <Skeleton height={15} width="30%" className="mb-2" />
      <Skeleton height={15} width="50%" className="mb-4" />

      <Skeleton height={15} width="30%" className="mb-2" />
      <Skeleton height={15} width="50%" className="mb-4" />
    </div>
  );
};

export default SkeletonItems;
