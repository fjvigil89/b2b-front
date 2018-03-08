import React from 'react';
import PropTypes from 'prop-types';
import ActionSheet from 'react-native-actionsheet';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { Header, Left, Button, Icon, Body, Title, Right, Item, Input } from 'native-base';

import { clearSearch, searchByName, filterSection } from '../actions/salas';
import showSearch from '../actions/salasHeader';

import CONSTANTES from '../constants/constants';

class SalasHeader extends React.Component {
  static propTypes = {
    clearSearch: PropTypes.func.isRequired,
    showSearch: PropTypes.func.isRequired,
    searchByName: PropTypes.func.isRequired,
    filterSection: PropTypes.func.isRequired,
    searchFilters: PropTypes.bool,
    isOpenSearch: PropTypes.bool,
    inputSearch: PropTypes.string,
  }

  static defaultProps = {
    searchFilters: false,
    isOpenSearch: false,
    inputSearch: '',
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
          <Header style={{ backgroundColor: '#FFFFFF' }}>
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
        <Left />
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
            options={CONSTANTES.OPTIONS_FILTERS_SALAS}
            cancelButtonIndex={CONSTANTES.CANCEL_INDEX}
            destructiveButtonIndex={CONSTANTES.DESTRUCTIVE_INDEX}
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
  searchFilters: state.salasHeader.searchFilters,
});

const mapDispatchToProps = {
  clearSearch,
  showSearch,
  searchByName,
  filterSection,
};

export default connect(mapStateToProps, mapDispatchToProps)(SalasHeader);
