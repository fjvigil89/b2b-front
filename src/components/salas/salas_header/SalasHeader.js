import React from "react";
import PropTypes from "prop-types";
import ActionSheet from "react-native-actionsheet";
import { connect } from "react-redux";
import * as Animatable from "react-native-animatable";
import { Actions } from "react-native-router-flux";
import {
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right,
  Item,
  Input
} from "native-base";

// Actions
import {
  ClearSearch,
  SearchByName,
  FilterSection,
  ShowSearch,
  ShowGeoLocation
} from "@components/salas/salas_header/SalasHeaderActions";

class SalasHeader extends React.Component {
  static propTypes = {
    ClearSearch: PropTypes.func.isRequired,
    ShowSearch: PropTypes.func.isRequired,
    ShowGeoLocation: PropTypes.func.isRequired,
    SearchByName: PropTypes.func.isRequired,
    FilterSection: PropTypes.func.isRequired,
    searchFilters: PropTypes.bool,
    isOpenSearch: PropTypes.bool,
    inputSearch: PropTypes.string,
    groupCadena: PropTypes.arrayOf(PropTypes.string),
    indexCancel: PropTypes.number,
    indexClean: PropTypes.number,
    orderLostSale: PropTypes.bool,
  };

  static defaultProps = {
    searchFilters: false,
    isOpenSearch: false,
    orderLostSale: true,
    inputSearch: "",
    groupCadena: ["Cancelar"],
    indexCancel: null,
    indexClean: null
  };

  openFilter = () => {
    this.ActionSheet.show();
  };

  ShowGeoLocation = () => {
    this.props.ShowGeoLocation(this.props.orderLostSale);
  }

  render() {
    const iconFilters = this.props.searchFilters
      ? "ios-funnel"
      : "ios-funnel-outline";

    const iconLocationLostSale = this.props.orderLostSale? 'logo-usd':'ios-navigate-outline';

    if (this.props.isOpenSearch) {
      return (
        <Animatable.View animation="fadeInRight" duration={500}>
          <Header
            style={{ backgroundColor: "#FFFFFF" }}
            iosBarStyle="dark-content"
          >
            <Button transparent onPress={this.props.ClearSearch}>
              <Icon name="arrow-back" style={{ color: "#000" }} />
            </Button>
            <Body rounded>
              <Item>
                <Input
                  style={{ color: "#000000" }}
                  placeholder="Buscar Sala..."
                  placeholderTextColor="#A4A4A4"
                  autoFocus={this.props.isOpenSearch}
                  value={this.props.inputSearch}
                  onChangeText={v => this.props.SearchByName(v)}
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
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>Mis Salas</Title>
        </Body>
        <Right>
          <Button transparent onPress={this.props.ShowSearch}>
            <Icon name="search" />
          </Button>
          <Button transparent onPress={this.openFilter}>
            <Icon name={iconFilters} />
          </Button>
          <Button transparent onPress={this.ShowGeoLocation}>
            <Icon name={iconLocationLostSale} />
          </Button>

          <ActionSheet
            ref={o => {
              this.ActionSheet = o;

              return this.ActionSheet;
            }}
            onPress={this.props.FilterSection}
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

const mapStateToProps = state => ({
  isOpenSearch: state.salasHeader.showSearch,
  orderLostSale: state.salasHeader.orderLostSale,
  inputSearch: state.salasHeader.inputSearch,
  searchFilters: state.salas.searchFilters,
  groupCadena: state.salas.groupCadena,
  indexCancel: state.salas.indexCancel,
  indexClean: state.salas.indexClean
});

const mapDispatchToProps = {
  ClearSearch,
  ShowSearch,
  SearchByName,
  FilterSection,
  ShowGeoLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(SalasHeader);
