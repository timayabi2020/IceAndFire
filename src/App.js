import React, { Component } from 'react';
import logo from './thrones5.png';
import { Card } from "./component/Card/Card.jsx";
import './App.css';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Grid, Row, Col, Table, Dropdown } from "react-bootstrap";
import APIService from "./service/Apiservice";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { Dialog, DialogContent, DialogActions, Button, Tooltip, Zoom, Input, InputLabel, TextField } from '@material-ui/core';

class App extends Component {
  constructor() {
    super();
    this.state = {
      characters: [],
      books: [],
      houses: [],
      showCharacters: true,
      showBooks: true,
      showHouses: true,
      openBook: false,
      openCharacter: false,
      openHouse: false,
      /**Characters details  */
      char_url: '',
      played_by: [],
      culture: '',
      date_born: '',
      titles: [],
      aliases: [],
      tv_series: [],
      alligiences: [],


      /**Books details */
      book_url: '',
      authors: [],
      isbn: '',
      numberOfPages: '',
      publisher: '',
      mediatype: '',
      released: '',
      characters: [],
      country: '',

      /**House details  */
      house_url: '',
      region: '',
      coatOfArms: '',
      words: '',
      heir: '',
      overload: '',
      founder: '',
      diedOut: '',
      house_titles: [],
      seats: [],
      currentLord: '',
      founded: '',
      ancestralWeapons: [],
      cadetBranches: [],
      swornMembers: [],

    }
  }
  async componentDidMount() {
    //Get characters
    await this.getCharacters();
    await this.getBooks();
    await this.getHouses();
  }
  async getCharacters() {
    //call API
    try {
      await APIService.makeApiGetRequest("characters")
        .then(data => this.setState({ characters: data }));
      this.setState({
        showCharacters: false
      });
    } catch (e) {

    }

  }

  async getBooks() {
    //call API
    try {
      await APIService.makeApiGetRequest("books/")
        .then(data => this.setState({ books: data }));
      this.setState({
        showBooks: false
      });
    } catch (e) {

    }

  }

  async getHouses() {
    //call API
    try {
      await APIService.makeApiGetRequest("houses/")
        .then(data => this.setState({ houses: data }));

      this.setState({
        showHouses: false
      });
    } catch (e) {

    }

  }

  cellHouseButton(cell, row, enumObject, rowIndex) {
    const { classes } = this.props;
    return (

      <Button

        style={{ backgroundColor: "#ff9900", color: "#FFF" }}
        onClick={() =>
          this.onClickHouseSelected(cell, row, enumObject, rowIndex)
        }
      >
        More details
      </Button>

    );
  }
  cellCharacterButton(cell, row, enumObject, rowIndex) {
    const { classes } = this.props;
    return (

      <Button
        style={{ backgroundColor: "#ff9900", color: "#FFF" }}
        onClick={() =>
          this.onClickCharacterSelected(cell, row, enumObject, rowIndex)
        }
      >
        More details
      </Button>

    );
  }

  cellBookButton(cell, row, enumObject, rowIndex) {
    const { classes } = this.props;
    return (

      <Button
        style={{ backgroundColor: "#ff9900", color: "#FFF" }}
        onClick={() =>
          this.onClickBookSelected(cell, row, enumObject, rowIndex)
        }
      >
        More details
      </Button>

    );
  }

  async onClickBookSelected(cell, row, enumObject, rowIndex) {

    this.setState({
      openBook: true,
      book_url: row.url,
      isbn: row.isbn,
      authors: row.authors,
      numberOfPages: row.numberOfPages,
      publisher: row.publisher,
      country: row.country,
      mediatype: row.mediaType,
      released: row.released,
      characters: row.characters,
      country: row.country
    });

  }
  async onClickHouseSelected(cell, row, enumObject, rowIndex) {
    this.setState({
      openHouse: true,
      house_url: row.url,
      region: row.region,
      coatOfArms: row.coatOfArms,
      words: row.words,
      house_titles: row.titles,
      seats: row.seats,
      currentLord: row.currentLord,
      heir: row.heir,
      overload: row.overlord,
      founded: row.founded,
      diedOut: row.diedOut,
      ancestralWeapons: row.ancestralWeapons,
      cadetBranches: row.cadetBranches,
      swornMembers: row.swornMembers

    });

  }
  async onClickCharacterSelected(cell, row, enumObject, rowIndex) {


    this.setState({
      openCharacter: true,
      char_url: row.url,
      played_by: row.playedBy,
      tv_series: row.tvSeries,
      aliases: row.aliases,
      titles: row.titles,
    });
  }

  closeCharacterDialog() {
    this.setState({
      openCharacter: false,
    });
  }

  closeBookDialog() {
    this.setState({
      openBook: false,
    });
  }
  closeHouseDialog() {
    this.setState({
      openHouse: false,
    });
  }
  render() {
    return (
      <div>
        <div class="App">
          <img src={logo} alt="logo" />
          <h2>Series</h2>
        </div>

        <div style={{ paddingLeft: "10px" }}>

          <div class="row">
            <div class="column">
              {this.state.showCharacters ? <Loader
                type="ThreeDots"
                color="#00BFFF"
                height={100}
                width={100}

              /> : null}
              <Card
                content={
                  <BootstrapTable
                    data={this.state.characters}

                    bordered={true}
                    striped
                    search
                    pagination={false}
                  //exportCSV
                  >
                    <TableHeaderColumn
                      dataField="aliases"
                      isKey

                    >
                      Characters
                        </TableHeaderColumn>



                    <TableHeaderColumn

                      height="2%"
                      thStyle={{ verticalAlign: "top" }}
                      dataField="button"
                      dataFormat={this.cellCharacterButton.bind(this)}
                    >

                    </TableHeaderColumn>
                  </BootstrapTable>
                } />
            </div>
            <div class="column">
              {this.state.showBooks ? <Loader
                type="ThreeDots"
                color="#00BFFF"
                height={100}
                width={100}

              /> : null}
              <Card
                content={
                  <BootstrapTable
                    data={this.state.books}
                    search
                    bordered={true}
                    striped
                    pagination={false}
                  //exportCSV
                  >
                    <TableHeaderColumn
                      dataField="name"
                      isKey

                    >
                      Books
                        </TableHeaderColumn>



                    <TableHeaderColumn
                      search
                      height="2%"
                      thStyle={{ verticalAlign: "top" }}
                      dataField="button"
                      dataFormat={this.cellBookButton.bind(this)}
                    >

                    </TableHeaderColumn>
                  </BootstrapTable>
                } />
            </div>
            <div class="column">
              {this.state.showHouses ? <Loader
                type="ThreeDots"
                color="#00BFFF"
                height={100}
                width={100}

              /> : null}
              <Card
                content={
                  <BootstrapTable
                    data={this.state.houses}
                    search
                    bordered={true}
                    striped
                    pagination={false}
                  //exportCSV
                  >
                    <TableHeaderColumn
                      dataField="name"
                      isKey

                    >
                      Houses
                        </TableHeaderColumn>



                    <TableHeaderColumn

                      height="2%"
                      thStyle={{ verticalAlign: "top" }}
                      dataField="button"
                      dataFormat={this.cellHouseButton.bind(this)}
                    >

                    </TableHeaderColumn>
                  </BootstrapTable>
                } />
            </div>
          </div>

        </div>
        <Dialog
          open={this.state.openCharacter}
          onClose={this.closeCharacterDialog.bind(this)}

        >
          <DialogContent>
            <div className="content">
              <p>Endpoint: {this.state.char_url} </p>
              <p>Played by: {this.state.played_by[0]} </p>
              <p>Seasons include: </p>
              <ul>
                {this.state.tv_series.map(function (name, index) {
                  return <li key={index}>{name}</li>;
                })}
              </ul>
              <p>Aliases include: </p>
              <ul>
                {this.state.aliases.map(function (name, index) {
                  return <li key={index}>{name}</li>;
                })}
              </ul>
              <p>Titles include: </p>
              <ul>
                {this.state.titles.map(function (name, index) {
                  return <li key={index}>{name}</li>;
                })}
              </ul>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog
          open={this.state.openBook}
          onClose={this.closeBookDialog.bind(this)}

        >
          <DialogContent>
            <div className="content">
              <p>Endpoint: {this.state.book_url} </p>
              <p>Authors include: </p>
              <ul>
                {this.state.authors.map(function (name, index) {
                  return <li key={index}>{name}</li>;
                })}
              </ul>
              <p>ISBN: {this.state.isbn} </p>
              <p>Pages: {this.state.numberOfPages} </p>
              <p>Publisher: {this.state.publisher} </p>
              <p>Country: {this.state.country} </p>
              <p>Media type: {this.state.mediatype} </p>
              <p>Characters include: </p>
              <ul>
                {this.state.characters.map(function (name, index) {
                  return <li key={index}>{name}</li>;
                })}
              </ul>

            </div>
          </DialogContent>
        </Dialog>



        <Dialog
          open={this.state.openHouse}
          onClose={this.closeHouseDialog.bind(this)}

        >
          <DialogContent>
            <div className="content">
              <p>Endpoint: {this.state.house_url} </p>
              <p>Region: {this.state.region} </p>
              <p>Coat of Arms: {this.state.coatOfArms} </p>
              <p>Words: {this.state.words} </p>
              <p>Titles include: </p>
              <ul>
                {this.state.titles.map(function (name, index) {
                  return <li key={index}>{name}</li>;
                })}
              </ul>
              <p>Seats include: </p>
              <ul>
                {this.state.seats.map(function (name, index) {
                  return <li key={index}>{name}</li>;
                })}
              </ul>
              <p>Current Lord: {this.state.currentLord} </p>
              <p>Heir: {this.state.heir} </p>
              <p>Over Lord: {this.state.overload} </p>
              <p>Founded: {this.state.founded} </p>
              <p>Founder: {this.state.founder} </p>
              <p>Died out: {this.state.diedOut} </p>
              <p>Cadet Branches include: </p>
              <ul>
                {this.state.cadetBranches.map(function (name, index) {
                  return <li key={index}>{name}</li>;
                })}
              </ul>
              <p>Sworn members include: </p>
              <ul>
                {this.state.swornMembers.map(function (name, index) {
                  return <li key={index}>{name}</li>;
                })}
              </ul>

            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default App;
