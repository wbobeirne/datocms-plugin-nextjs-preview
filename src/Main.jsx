import React, { Component } from 'react';
import PropTypes from 'prop-types';

import connectToDatoCms from './connectToDatoCms';
import './style.scss';

const replacementFieldRegex = /\$[a-zA-Z_]+/g;

@connectToDatoCms(plugin => ({
  developmentMode: plugin.parameters.global.developmentMode,
  fieldValue: plugin.getFieldValue(plugin.fieldPath),
  plugin,
}))
export default class Main extends Component {
  static propTypes = {
    plugin: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      fields: {},
      locales: props.plugin.site.attributes.locales,
      selectedLocale: props.plugin.site.attributes.locales[0]
    };
  }

  componentDidMount() {
    const { plugin } = this.props;
    const matches = this.getPathReplacementFields();

    if (matches) {
      const fields = {};
      this.unsubscribers = [];

      // Subscribe to changes for all fields that are used in the path
      matches.forEach((m) => {
        fields[m] = plugin.getFieldValue(m);
        this.unsubscribers.push(plugin.addFieldChangeListener(m, (value) => {
          this.setState(s => ({
            ...s,
            fields: {
              ...s,
              [m]: value,
            },
          }));
        }));
      });

      this.setState({ fields });
    }
  }

  componentWillUnmount() {
    if (this.unsubscribers) {
      this.unsubscribers.forEach(unsub => unsub());
    };
  }

  getPathReplacementFields() {
    // eslint-disable-next-line react/destructuring-assignment
    const matches = this.props.plugin.parameters.instance.entityPath.match(replacementFieldRegex);
    return matches && matches.map(m => m.replace('$', ''));
  }

  getEntityPath() {
    const { plugin } = this.props;
    const { fields, selectedLocale } = this.state;
    let { entityPath } = plugin.parameters.instance;


    Object.entries(fields).forEach(([field, value]) => {
      entityPath = entityPath.replace(`$${field}`, value[selectedLocale]);
    });

    return entityPath;
  }


  render() {
    const { plugin } = this.props;
    const { locales, selectedLocale } = this.state;
    const { accentColor } = plugin.theme;
    const {
      parameters: {
        global: {
          instanceUrl,
          previewPath,
          previewSecret,
        },
      },
    } = plugin;

    if (plugin.itemStatus === 'new') {
      return <p className="new-msg">Must save entity at least once before previewing</p>;
    }

    const path = this.getEntityPath();
    const noSlashInstanceUrl = instanceUrl.replace(/\/$/, '');

    const previewHref = `${noSlashInstanceUrl}${previewPath}?slug=${path}${previewSecret ? `&secret=${previewSecret}` : ''}`;
    const liveHref = `${noSlashInstanceUrl}${path}`;

    return (
      <>
        <select style={{
          width: '100%',
          marginBottom: 10
        }}
        onChange={
          event => {
            const value = event.target.value;
            this.setState(s => ({...s, selectedLocale: value}))
          }
        }>
          {
            locales.map((locale, i) => 
              <option key={i} value={locale} selected={locale === selectedLocale}>
                {locale}
              </option>
              )
          }
        </select>
        <a className="primary" target="_blank" rel="noopener noreferrer" href={previewHref} style={{ backgroundColor: accentColor }}>Preview</a>
        <a className="secondary" target="_blank" rel="noopener noreferrer" href={liveHref} style={{ borderColor: accentColor, color: accentColor }}>View published</a>
      </>
    );
  }
}
