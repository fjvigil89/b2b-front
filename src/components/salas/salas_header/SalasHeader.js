import React from "react";
import PropTypes from "prop-types";
import ActionSheet from "react-native-actionsheet";
import { connect } from "react-redux";
import * as Animatable from "react-native-animatable";
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
  ShowSearch
} from "@components/salas/salas_header/SalasHeaderActions";
import { Logout } from "@components/login/LoginActions";

class SalasHeader extends React.Component {
  static propTypes = {
    ClearSearch: PropTypes.func.isRequired,
    ShowSearch: PropTypes.func.isRequired,
    SearchByName: PropTypes.func.isRequired,
    FilterSection: PropTypes.func.isRequired,
    Logout: PropTypes.func.isRequired,
    searchFilters: PropTypes.bool,
    isOpenSearch: PropTypes.bool,
    inputSearch: PropTypes.string,
    groupCadena: PropTypes.arrayOf(PropTypes.string),
    indexCancel: PropTypes.number,
    indexClean: PropTypes.number
  };

  static defaultProps = {
    searchFilters: false,
    isOpenSearch: false,
    inputSearch: "",
    groupCadena: ["Cancelar"],
    indexCancel: null,
    indexClean: null
  };

  openFilter = () => {
    this.ActionSheet.show();
  };

  render() {
    const iconFilters = this.props.searchFilters
      ? "ios-funnel"
      : "ios-funnel-outline";

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
          <Button transparent onPress={this.props.Logout}>
            <Icon name="exit" />
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
  Logout
};

export default connect(mapStateToProps, mapDispatchToProps)(SalasHeader);
