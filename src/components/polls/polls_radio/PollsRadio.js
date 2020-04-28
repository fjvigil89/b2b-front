import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Right, Left, Radio, Text, ListItem, Content, View } from 'native-base';
import { ChangeInput } from '@components/polls/PollsActions';

class PollsRadio extends Component {
  static propTypes = {
    ChangeInput: PropTypes.func.isRequired,
    data: PropTypes.oneOfType([PropTypes.any]),
    position: PropTypes.number,
    value: PropTypes.oneOfType([PropTypes.any]),
  };

  static defaultProps = {
    data: {},
    position: 0,
    value: null,
  };

  state = {
    check: [],
    position: 0,
  };

  componentWillMount = () => {
    this.state.position = this.props.position;
    this.config();
  };

  componentWillUpdate(nextProps) {
    if (nextProps.position !== this.state.position) {
      let check = [];
      if (this.props.value) {
        check = this.props.value;
      } else {
        this.props.data.config.map((item, index) => (check[index] = false));
      }

      this.setState((state) => ({
        ...state,
        position: nextProps.position,
        check,
      }));
    }
  }

  config() {
    if (this.props.value) {
      this.state.check = this.props.value;
    } else {
      this.props.data.config.map(
        (item, index) => (this.state.check[index] = false)
      );
    }
  }

  render = () => {
    const { data } = this.props;
    return (
      <Content>
        {data.config.map((item, index) => (
          <View key={item.id}>
            <ListItem
              style={{ width: '90%' }}
              onTouchStart={() => {
                this.setState((state) => {
                  this.state.check.map(
                    (ch, i) => (this.state.check[i] = false)
                  );
                  this.state.check[index] = !state.check[index];

                  // this.props.ChangeInput({
                  //   value: state.check,
                  //   position: this.props.position
                  // });

                  this.props.ChangeInput({
                    value: item.text,
                    position: this.props.position,
                  });

                  return {
                    check: state.check,
                  };
                });
              }}
              key={`${data.index}${item.id}`}
            >
              <Left>
                <Text>{item.text}</Text>
              </Left>
              <Right>
                <Radio selected={this.state.check[index]} />
              </Right>
            </ListItem>
          </View>
        ))}
      </Content>
    );
  };
}

const mapStateToProps = (state) => ({
  value: state.polls.value,
});

const mapDispatchToProps = {
  ChangeInput,
};

export default connect(mapStateToProps, mapDispatchToProps)(PollsRadio);
