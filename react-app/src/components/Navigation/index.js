import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	let shopLink
	if (sessionUser) {
		shopLink = (
			<NavLink to="/products/current" style={{ color: "black" }}>
				<div className='nav-buttons-shop' onClick>
					<i className="fas fa-store" />
				</div>
			</NavLink>
		)
	}

	return (
		<div className='nav-container'>
			<div className='nav-home'>
				<NavLink exact to="/" style={{ textDecoration: 'none', color: "black" }}>Etsy</NavLink>
			</div>
			<div className='nav-search'>
				<input className="nav-search-bar" type="search" placeholder='Search for anything' />
			</div>
			<div className='nav-buttons'>
				{shopLink}
				{isLoaded && (
					<div className='nav-buttons-profile'>
						<ProfileButton user={sessionUser} />
					</div>
				)}
				<NavLink to="/cart" style={{ textDecoration: 'none', color: "black" }}>
					<div className='nav-buttons-cart'>
						<i className="fas fa-shopping-cart" />
					</div>
				</NavLink>
			</div>
		</div>
	);
}

export default Navigation;
