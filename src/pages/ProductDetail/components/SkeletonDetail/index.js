import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SkeletonDetail = () => {
  return (
    <SkeletonTheme>
      <Skeleton height={35} className="mb-4" />
      <div className="row">
        <div className="col-6 offset-3">
          <Skeleton height={300} className="mb-3" />
        </div>
      </div>
      <Skeleton count={4} className="mb-2" />

      <Skeleton height={32} width="30%" className="mb-2 mt-4" />
      <div className="row">
        <div className="col-3">
          <Skeleton height={32} />
        </div>
        <div className="col-3">
          <Skeleton height={32} />
        </div>
        <div className="col-3">
          <Skeleton height={32} />
        </div>
        <div className="col-3">
          <Skeleton height={32} />
        </div>

        <Skeleton height={32} width="20%" className="mb-3 mt-5" />
        <Skeleton count={6} height={30} className="mb-3" />

        <Skeleton height={32} width="20%" className="mb-3 mt-5" />
        <Skeleton height={400} className="mb-3" />
      </div>
    </SkeletonTheme>
  );
};

export default SkeletonDetail;
