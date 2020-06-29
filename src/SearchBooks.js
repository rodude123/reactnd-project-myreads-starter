import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import * as bpi from "./BooksAPI"
import Book from "./Book";
import {getAll} from "./BooksAPI";

class SearchBooks extends Component
{
	
	state = {filteredBooks: [], query: ""}
	
	search = e =>
	{
		let searchTerm = e.target.value
		bpi.search(searchTerm, 20).then(data =>
		{
			let currBooks = [];
			getAll().then(books =>{ currBooks = books})
			if (data !== undefined && data.error === undefined)
			{
				let newData = []
				data.map(item1 =>
				{
					const found = currBooks.filter(cb => cb.id === item1.id)
					if(found.length !== 1)
					{
						newData.push(item1)
					}
					return null;
				})
				this.setState(() => ({filteredBooks: newData, query: searchTerm}));
			}
			else
			{
				this.setState(() => ({filteredBooks: [], query: ""}));
			}
		})
	}
	
	render()
	{
		const {query, filteredBooks} = this.state;
		return (
			<div>
				<div className="search-books">
					<div className="search-books-bar">
						<Link className="close-search" to="/">Close</Link>
						<div className="search-books-input-wrapper">
							<input type="text" placeholder="Search by title or author" onChange={this.search}/>
						</div>
					</div>
					<div className="search-books-results">
						<ol className="books-grid">
						{
							filteredBooks && query !== "" && filteredBooks.map( book =>
							{
								return book && <li key={book.id}><Book book={book} getBooks={() => {}}/></li>
							})
						}
						</ol>
					</div>
				</div>
			</div>
		);
	}
}

export default SearchBooks;