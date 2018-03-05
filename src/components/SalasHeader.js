import React from 'react';
import PropTypes from 'prop-types';
import ActionSheet from 'react-native-actionsheet';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';

import { Header, Left, Button, Icon, Body, Title, Right, Item, Input } from 'native-base';

import CONSTANTES from '../constants/constants';

class SalasHeader extends React.Component {
  static propTypes = {
    salasFilter: PropTypes.func.isRequired,
    clearSearch: PropTypes.func.isRequired,
    filterSection: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      showSearch: false,
      inputSearch: '',
      searchFilters: false,
    };

    this.showSearch = this.showSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.openFilter = this.openFilter.bind(this);
    this.filterSection = this.filterSection.bind(this);
  }

  showSearch() {
    this.setState({
      showSearch: !this.state.showSearch,
      inputSearch: '',
      searchFilters: false,
    });
    
    if (this.state.showSearch) {
      this.props.clearSearch();
    }
  }

  handleChange = (name, val) => {
    this.setState({
      ...this.state,
      [name]: val,
    });

    this.props.salasFilter(val);
  }

  openFilter = () => {
    this.ActionSheet.show();
  }

  filterSection(i) {
    if (i === CONSTANTES.CANCEL_INDEX) {
      return;
    } else if (i === CONSTANTES.DESTRUCTIVE_INDEX) {
      this.setState({
        searchFilters: false,
      });

      this.props.filterSection(i);
      
      return;
    }

    this.props.filterSection(i);

    this.setState({
      searchFilters: true,
    });
  }

  render() {
    const iconFilters = this.state.searchFilters ? 'ios-funnel' : 'ios-funnel-outline';

    if (this.state.showSearch) {
      return (
        <Animatable.View
          animation="fadeInRight"
          duration={500}
        >
          <Header style={{ backgroundColor: '#FFFFFF' }}>
            <Button transparent onPress={this.showSearch}>
              <Icon name="arrow-back" style={{ color: '#000' }} />
            </Button>
            <Body rounded>
              <Item>
                <Input style={{ color: '#000000' }} placeholder="Buscar Sala..." placeholderTextColor="#A4A4A4" autoFocus={this.state.showSearch} value={this.state.inputSearch} onChangeText={v => this.handleChange('inputSearch', v)} />
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
          <Button transparent onPress={this.showSearch}>
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
            onPress={this.filterSection}
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
  salas: state.salas.listSalas,
});

export default connect(mapStateToProps)(SalasHeader);
