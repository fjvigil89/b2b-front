import React from 'react';
import PropTypes from 'prop-types';
import ActionSheet from 'react-native-actionsheet';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { Header, Left, Button, Icon, Body, Title, Right, Item, Input } from 'native-base';

import { clearSearch, searchByName, filterSection } from '../actions/salas';
import showSearch from '../actions/salasHeader';
import { logout } from '../actions/user';

class SalasHeader extends React.Component {
  static propTypes = {
    clearSearch: PropTypes.func.isRequired,
    showSearch: PropTypes.func.isRequired,
    searchByName: PropTypes.func.isRequired,
    filterSection: PropTypes.func.isRequired,
    searchFilters: PropTypes.bool,
    isOpenSearch: PropTypes.bool,
    inputSearch: PropTypes.string,
    logout: PropTypes.func.isRequired,
    groupCadena: PropTypes.arrayOf(PropTypes.string),
    indexCancel: PropTypes.number,
    indexClean: PropTypes.number,
  }

  static defaultProps = {
    searchFilters: false,
    isOpenSearch: false,
    inputSearch: '',
    groupCadena: ['Cancelar'],
    indexCancel: null,
    indexClean: null,
  }

  openFilter = () => {
    this.ActionSheet.show();
  }

  render() {
    const iconFilters = this.props.searchFilters ? 'ios-funnel' : 'ios-funnel-outline';

    if (this.props.isOpenSearch) {
      return (
        <Animatable.View
          animation="fadeInRight"
          duration={500}
        >
          <Header style={{ backgroundColor: '#FFFFFF' }} iosBarStyle="dark-content">
            <Button transparent onPress={this.props.clearSearch}>
              <Icon name="arrow-back" style={{ color: '#000' }} />
            </Button>
            <Body rounded>
              <Item>
                <Input style={{ color: '#000000' }} placeholder="Buscar Sala..." placeholderTextColor="#A4A4A4" autoFocus={this.props.isOpenSearch} value={this.props.inputSearch} onChangeText={v => this.props.searchByName(v)} />
              </Item>
            </Body>
          </Header>
        </Animatable.View>
      );
    }

    return (
      <Header>
        <Left>
          <Button transparent onPress={this.props.logout}>
            <Icon name="exit" />
          </Button>
        </Left>
        <Body>
          <Title>Mis Salas</Title>
        </Body>
        <Right>
          <Button transparent onPress={this.props.showSearch}>
            <Icon name="search" />
          </Button>
          <Button transparent onPress={this.openFilter} >
            <Icon name={iconFilters} />
          </Button>

          <ActionSheet
            ref={(o) => {
              this.ActionSheet = o;

              return this.ActionSheet;
            }}
            onPress={this.props.filterSection}
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
  indexClean: state.salas.indexClean,
});

const mapDispatchToProps = {
  clearSearch,
  showSearch,
  searchByName,
  filterSection,
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(SalasHeader);
