'use client';

import { track } from '@vercel/analytics/react';
import Link from 'next/link';

const LinkClient = ({ children, trackInfo, ...rest }) => (
  <Link {...rest} onClick={() => trackInfo && track(trackInfo.title, { label: trackInfo.label })}>
    {children}
  </Link>
);

export default LinkClient;
