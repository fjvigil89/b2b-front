import React, { Component } from "react";
import PropTypes from "prop-types";
import { Body, Text, ListItem, Content, CheckBox } from "native-base";
import { connect } from "react-redux";
import { ChangeInput } from "@components/polls/PollsActions";

class PollsCheckBox extends Component {
  static propTypes = {
    ChangeInput: PropTypes.func.isRequired,
    data: PropTypes.oneOfType([PropTypes.any]),
    position: PropTypes.number,
    value: PropTypes.oneOfType([PropTypes.any])
  };

  static defaultProps = {
    data: {},
    position: 0,
    value: null
  };

  state = {
    check: []
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

      this.setState(state => ({
        ...state,
        position: nextProps.position,
        check
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
          <ListItem
            style={{ width: "90%" }}
            onTouchStart={() => {
              this.setState(state => {
                this.state.check[index] = !state.check[index];
                this.props.ChangeInput({
                  value: state.check,
                  position: this.props.position
                });
                return {
                  check: state.check
                };
              });
            }}
            key={`${data.index}${item.id}`}
          >
            <CheckBox
              checked={this.state.check[index]}
              /*
              onPress={() =>
                this.props.ChangeInput({ value: this.state.check, position })
              }
              */
            />
            <Body>
              <Text>{item.text}</Text>
            </Body>
          </ListItem>
        ))}
      </Content>
    );
  };
}

const mapStateToProps = state => ({
  value: state.polls.value
});

const mapDispatchToProps = {
  ChangeInput
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PollsCheckBox);
