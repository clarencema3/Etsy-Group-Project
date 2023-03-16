import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { fetchCartItems } from '../../store/cart';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const cart = useSelector(state => state.cart.cart)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchCartItems())
	}, [dispatch])

	let cartArr = []
	if (cart) {
		cartArr = Object.values(cart)
	}

	let cartItemNum = 0
	let cartItemNumDisplay
	if (cartArr.length >= 1) {
		for (let i = 0; i < cartArr.length; i++) {
			cartItemNum += cartArr[i].quantity

		}
		cartItemNumDisplay = (
			<span className='cart-item-num'>{cartItemNum}</span>
		)
	}



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
		<div className='nav-container white-space'>
			<div className='nav-home'>
				<NavLink exact to="/" style={{ textDecoration: 'none', color: "orange" }}>Petsy</NavLink>
			</div>
			<div className='nav-search'>
				<input className="nav-search-bar" type="search" placeholder='Search feature coming soon' />
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
						{cartItemNumDisplay}
					</div>
				</NavLink>
			</div>
		</div>
	);
}

export default Navigation;
