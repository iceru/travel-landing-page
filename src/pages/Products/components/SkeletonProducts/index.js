import React from 'react'

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const SkeletonProducts = () => {
  return (
    <SkeletonTheme height={38}>
      <Skeleton className="mb-4" />

      <div className="row mb-4">
        <div className="col">
          <Skeleton />
        </div>
        <div className="col">
          <Skeleton />
        </div>
        <div className="col">
          <Skeleton />
        </div>
        <div className="col">
          <Skeleton />
        </div>
        <div className="col">
          <Skeleton />
        </div>
      </div>

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
  )
}

export default SkeletonProducts
