import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { cn } from '../../util/util';

import styles from './styles.scss';

const Header = ({ username }) => (

	<div className={cn(styles.content, "container-fluid")}>
		<div className={cn("container", "py-3")}>
			
			<div className={cn("row")}>
				<p className={cn("col", "my-0")}><Link prefetch href='/'><a className={cn(styles.title)}>loop</a></Link></p>
				
				{
					(username ? (
							<div>
								<Link prefetch href="/"><a className={cn()}>Account</a></Link>
							</div>
						) : (
							<div>
								<Link prefetch href="/signin"><a className={cn(styles.nav_item_spacing)}>Signin</a></Link>
								<Link prefetch href="/register"><a>Register</a></Link>
							</div>
						))
				}
			</div>
			
		</div>
	</div>

);

const mstp = state => ({
	username: state.login.token
});

const mdtp = dispatch => ({

});

export default connect(mstp, mdtp)(Header);