import React, {Component} from 'react';
import {Link} from "react-router-dom";
import * as bpi from "./BooksAPI"
import Book from "./Book";

class SearchBooks extends Component
{
	
	state = {filteredBooks: [], query: ""}
	
	search = e =>
	{
		const {currBooks} = this.props;
		let searchTerm = e.target.value
		bpi.search(searchTerm).then(data =>
		{
			if (data !== undefined && data.error === undefined)
			{
				let newData = []
				data.map(item1 =>
				{
					const found = currBooks.filter(cb => cb.id === item1.id)
					console.log(found)
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
	
	handleSearchChange = () =>
	{
		
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
							<input id="search" type="text" placeholder="Search by title or author" onChange={this.search}/>
						</div>
					</div>
					<div className="search-books-results">
						<ol className="books-grid">
						{
							filteredBooks && query !== "" && filteredBooks.map( book =>
							{
								return book && <li key={book.id}><Book book={book} handleSearchChange={this.handleSearchChange()}/></li>
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