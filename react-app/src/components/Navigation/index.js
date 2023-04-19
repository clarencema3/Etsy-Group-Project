import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { fetchCartItems } from '../../store/cart';
import { fetchProducts } from '../../store/products';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const cart = useSelector(state => state.cart.cart)
	const products = useSelector(state => state.products.products)
	const [value, setValue] = useState('')

	const dispatch = useDispatch()
	const history = useHistory()

	useEffect(() => {
		dispatch(fetchProducts())
		const checkUser = () => {
			if (sessionUser) {
				dispatch(fetchCartItems())
			}
		}
		checkUser()
	}, [dispatch])

	if (!products) return <div>Loading...</div>
	let productSearch = products ? Object.values(products) : []

	// search ---------------------------------------------------------------------
	const onChangeHandler = (e) => {
		setValue(e.target.value)
	}

	const onClickhHandler = (item, id) => {
		// setValue(company)
		// setStockTick(ticker)
		history.push(`/products/${id}`)
		setValue("")
	}

	const filterData = (data) => {
		const filteredData = data.filter(item => {
			const searchInfo = value.toLowerCase()
			const productName = item.product_name.toLowerCase()
			return searchInfo && productName.startsWith(searchInfo) && productName !== searchInfo
		})

		const resultList = filteredData.slice(0, 6)
		return resultList
	}

	// cart -----------------------------------------------------------------------
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
				<input className="nav-search-bar" type="text" placeholder='Search' onChange={onChangeHandler} value={value} />
				<div className={value ? 'search-dropdown' : "hidden"}>
					{filterData(productSearch).map(item => (
						<div key={item.id} className='search-results' onClick={() => onClickhHandler(item, item.id)}>
							<div>{item.product_name}</div>
						</div>
					))}
				</div>
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
