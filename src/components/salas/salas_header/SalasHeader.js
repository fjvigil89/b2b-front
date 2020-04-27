import React from 'react';
import PropTypes from 'prop-types';
import ActionSheet from 'react-native-actionsheet';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { Actions } from 'react-native-router-flux';
import {
  Header,
  Left,
  Button,
  Body,
  Title,
  Right,
  Item,
  Input,
} from 'native-base';

// Actions
import {
  ClearSearch,
  SearchByName,
  FilterSection,
  ShowSearch,
  ShowListForGeolocation,
  ShowListForLostSale,
} from '@components/salas/salas_header/SalasHeaderActions';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

class SalasHeader extends React.Component {
  static propTypes = {
    ClearSearch: PropTypes.func.isRequired,
    ShowSearch: PropTypes.func.isRequired,
    ShowListForGeolocation: PropTypes.func.isRequired,
    ShowListForLostSale: PropTypes.func.isRequired,
    SearchByName: PropTypes.func.isRequired,
    FilterSection: PropTypes.func.isRequired,
    searchFilters: PropTypes.bool,
    isOpenSearch: PropTypes.bool,
    inputSearch: PropTypes.string,
    groupCadena: PropTypes.arrayOf(PropTypes.string),
    indexCancel: PropTypes.number,
    indexClean: PropTypes.number,
    lostSaleON: PropTypes.bool,
  };

  static defaultProps = {
    searchFilters: false,
    isOpenSearch: false,
    lostSaleON: true,
    inputSearch: '',
    groupCadena: ['Cancelar'],
    indexCancel: null,
    indexClean: null,
  };

  openFilter = () => {
    this.ActionSheet.show();
  };

  filterResults = (e) => {
    this.props.FilterSection(e, this.props.lostSaleON);
  };

  LostSaleOrGeolocation = () => {
    if (this.props.lostSaleON) {
      this.props.ShowListForGeolocation();
    } else {
      this.props.ShowListForLostSale();
    }
  };

  render() {
    const iconFilters = this.props.searchFilters ? 'ios-funnel' : 'ios-funnel';

    const iconLocationLostSale = this.props.lostSaleON
      ? 'ios-navigate'
      : 'logo-usd';

    if (this.props.isOpenSearch) {
      return (
        <Animatable.View animation="fadeInRight" duration={500}>
          <Header
            style={{ backgroundColor: '#FFFFFF' }}
            iosBarStyle="dark-content"
          >
            <Button transparent onPress={this.props.ClearSearch}>
              <Ionicons
                name="md-arrow-back"
                style={{ fontSize: 24, color: '#000' }}
              />
            </Button>
            <Body rounded>
              <Item>
                <Input
                  style={{ color: '#000000' }}
                  placeholder="Buscar Sala..."
                  placeholderTextColor="#A4A4A4"
                  autoFocus={this.props.isOpenSearch}
                  value={this.props.inputSearch}
                  onChangeText={(v) => this.props.SearchByName(v)}
                />
              </Item>
            </Body>
          </Header>
        </Animatable.View>
      );
    }

    return (
      <Header style={{ borderBottomWidth: 0 }}>
        <Left>
          <Button transparent onPress={Actions.drawerOpen}>
            <MaterialIcons
              name="menu"
              style={{
                color: 'white',
                fontSize: 25,
              }}
            />
          </Button>
        </Left>
        <Body>
          <Title
            style={{
              color: 'white',
            }}
          >
            Mis Salas
          </Title>
        </Body>
        <Right>
          <Button transparent onPress={this.props.ShowSearch}>
            <Ionicons
              name="ios-search"
              style={{
                color: 'white',
                fontSize: 25,
              }}
            />
          </Button>
          <Button transparent onPress={this.openFilter}>
            <Ionicons
              name={iconFilters}
              style={{
                color: 'white',
                fontSize: 25,
              }}
            />
          </Button>
          <Button transparent onPress={this.LostSaleOrGeolocation}>
            <Ionicons
              name={iconLocationLostSale}
              style={{
                color: 'white',
                fontSize: 25,
              }}
            />
          </Button>

          <ActionSheet
            ref={(o) => {
              this.ActionSheet = o;

              return this.ActionSheet;
            }}
            onPress={this.filterResults}
            options={this.props.groupCadena}
            cancelButtonIndex={this.props.indexCancel}
            destructiveButtonIndex={this.props.indexClean}
            title="Filtro"
          />
        </Right>
      </Header>
    );
  }
}

const mapStateToProps = (state) => ({
  isOpenSearch: state.salasHeader.showSearch,
  lostSaleON: state.salasHeader.lostSaleON,
  inputSearch: state.salasHeader.inputSearch,
  searchFilters: state.salas.searchFilters,
  groupCadena: state.salas.groupCadena,
  indexCancel: state.salas.indexCancel,
  indexClean: state.salas.indexClean,
});

const mapDispatchToProps = {
  ClearSearch,
  ShowSearch,
  SearchByName,
  FilterSection,
  ShowListForGeolocation,
  ShowListForLostSale,
};

export default connect(mapStateToProps, mapDispatchToProps)(SalasHeader);
