import React from 'react';
import Link from 'next/link';
import { cn } from '../../util/util';

import styles from './styles.scss';

const Header = () => (

	<div className={cn(styles.content, "container-fluid")}>
		<div className={cn("container", "py-3")}>
			
			<div className={cn("row")}>
				<p className={cn("col", "my-0")}><Link prefetch href='/'><a>Loop</a></Link></p>
				
				<div>
					<Link prefetch href="/signin"><a className={cn(styles.nav_item_spacing)}>Signin</a></Link>
					<Link prefetch href="/register"><a>Register</a></Link>
				</div>
			</div>
			
		</div>
	</div>

);

export default Header;